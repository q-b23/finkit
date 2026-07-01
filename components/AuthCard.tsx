"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Icons                                                            */
/* ------------------------------------------------------------------ */

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  State machine types                                              */
/* ------------------------------------------------------------------ */

type AuthState =
  | "idle"
  | "sending_email"
  | "email_sent"
  | "waiting_verification"
  | "authenticated"
  | "error";

/* ------------------------------------------------------------------ */
/*  Constants                                                        */
/* ------------------------------------------------------------------ */

const POLL_INTERVAL_MS = 2_000;
const TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;

/* ------------------------------------------------------------------ */
/*  Spinner                                                          */
/* ------------------------------------------------------------------ */

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                        */
/* ------------------------------------------------------------------ */

export default function AuthCard() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<AuthState>("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const retryCount = useRef(0);
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollAttemptRef = useRef(0);

  console.log("[AUTH] AuthCard mounted");
  console.log("[AUTH] email =", email);
  console.log("[AUTH] isEmailDisabled =", !email.trim() || (state === "sending_email" || state === "waiting_verification"));
  console.log("[AUTH] current state =", state);

  /** Stop all timers and reset retry count. */
  const stopPolling = useCallback(() => {
    if (pollTimer.current) { clearInterval(pollTimer.current); pollTimer.current = null; }
    if (timeoutTimer.current) { clearTimeout(timeoutTimer.current); timeoutTimer.current = null; }
    if (countdownTimer.current) { clearInterval(countdownTimer.current); countdownTimer.current = null; }
    retryCount.current = 0;
    pollAttemptRef.current = 0;
    setCountdown(0);
  }, []);

  /** Poll /api/auth/status for verification completion. */
  const startPolling = useCallback((id: string) => {
    stopPolling();
    setState("waiting_verification");
    console.log("【Frontend】开始轮询 /api/auth/status", { requestId: id });

    setCountdown(Math.ceil(TIMEOUT_MS / 1000));
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1_000);

    pollTimer.current = setInterval(async () => {
      pollAttemptRef.current++;
      const attempt = pollAttemptRef.current;
      console.log(`【Frontend】轮询第 ${attempt} 次`, { requestId: id });

      try {
        const res = await fetch(`/api/auth/status?request_id=${id}`);
        console.log(`【Frontend】轮询响应`, { status: res.status, ok: res.ok, attempt });

        if (!res.ok) {
          console.error("【Frontend】poll 失败", { status: res.status, attempt });
          if (retryCount.current < MAX_RETRIES) {
            retryCount.current++;
            const delay = Math.pow(2, retryCount.current) * 1000;
            console.log(`【Frontend】重试 ${retryCount.current}/${MAX_RETRIES} (${delay}ms)`);
            return;
          }
          stopPolling();
          setState("error");
          setNotice("Unable to verify login. Please try again.");
          console.error("【Frontend】登录失败：轮询耗尽重试次数");
          return;
        }

        const data = await res.json();
        console.log(`【Frontend】状态数据`, { status: data.status, hasToken: !!data.token, attempt });

        if (data.status === "complete") {
          console.log("【Frontend】登录完成！停止轮询");
          stopPolling();
          setState("authenticated");
          setNotice("Signed in successfully. Redirecting...");
          if (data.token && typeof window !== "undefined") {
            localStorage.setItem("finkit-session", data.token);
            console.log("【Frontend】session token 已存储");
          }
          setTimeout(() => {
            console.log("【Frontend】重定向到 /");
            window.location.href = "/";
          }, 1_000);
        } else if (data.status === "failed") {
          console.error("【Frontend】登录失败", { error: data.error });
          stopPolling();
          setState("error");
          setNotice(data.error || "Login failed. Please try again.");
        }
      } catch (err) {
        console.error("【Frontend】poll 网络异常", err);
        if (retryCount.current < MAX_RETRIES) {
          retryCount.current++;
          return;
        }
        stopPolling();
        setState("error");
        setNotice("Network error. Please check your connection and try again.");
      }
    }, POLL_INTERVAL_MS);

    timeoutTimer.current = setTimeout(() => {
      stopPolling();
      setState("error");
      setNotice("Email login is taking longer than expected. Please try again.");
      console.error("【Frontend】登录超时 (30s)", { requestId: id });
    }, TIMEOUT_MS);
  }, [stopPolling]);

  /** Cleanup timers on unmount. */
  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                        */
  /* ---------------------------------------------------------------- */

  const handleEmail = async (e: React.FormEvent) => {
    console.log("[AUTH] handleEmail entered — email =", email);
    e.preventDefault();
    if (!email.trim()) {
      console.log("[AUTH] handleEmail EXIT — email is empty, returning early");
      return;
    }

    console.log("【Frontend】点击发送 → 开始登录流程", { email: email.trim() });
    setState("sending_email");
    setNotice(null);

    try {
      console.log("【Frontend】开始 fetch → POST /api/auth/login");
      console.log("[AUTH] about to fetch /api/auth/login");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      console.log("[AUTH] fetch returned", res.status);
      console.log("【Frontend】收到响应", { status: res.status, ok: res.ok, data });

      if (res.status === 202 && data.request_id) {
        console.log("【Frontend】202 已处理 → 进入轮询", { requestId: data.request_id });
        setState("email_sent");
        setRequestId(data.request_id);
        setNotice("Check your inbox! A verification link has been sent.");
        startPolling(data.request_id);
      } else {
        console.error("【Frontend】意外响应", { status: res.status, data });
        setState("error");
        setNotice(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("【Frontend】登录请求失败", err);
      setState("error");
      setNotice("Network error. Please check your connection and try again.");
    }
  };

  const handleRetry = () => {
    console.log("【Frontend】用户点击重试");
    setState("idle");
    setNotice(null);
    setRequestId(null);
    stopPolling();
  };

  /* ---------------------------------------------------------------- */
  /*  Derived state                                                   */
  /* ---------------------------------------------------------------- */

  const isLoading = state === "sending_email" || state === "waiting_verification";
  const isEmailDisabled = !email.trim() || isLoading;

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */

  return (
    <div className="flex items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Start Planning Your Financial Freedom
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              No credit card required. All tools free and open source.
            </p>
          </div>

          {/* SSO Buttons — intentionally disabled, coming soon */}
          <div className="space-y-3">
            <button
              disabled
              aria-disabled="true"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-400 cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
              <span className="ml-auto rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                Soon
              </span>
            </button>

            <button
              disabled
              aria-disabled="true"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-400 cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500"
            >
              <AppleIcon />
              <span>Continue with Apple</span>
              <span className="ml-auto rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                Soon
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">or</span>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              disabled={isLoading}
              autoComplete="email"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
            />

            <button
              type="submit"
              disabled={isEmailDisabled}
              onPointerDown={() => console.log("[AUTH] pointer down")
              } onMouseDown={() => console.log("[AUTH] mouse down")
              } onClick={() => console.log("[AUTH] button clicked — disabled=", isEmailDisabled, "email=", email)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-300"
            >
              {state === "waiting_verification" ? (
                <>{countdown > 0 ? `Verifying (${countdown}s)` : "Verifying"} <Spinner /></>
              ) : state === "sending_email" ? (
                <>Sending <Spinner /></>
              ) : (
                <span>Continue with email</span>
              )}
            </button>

            {/* Hint when email field is empty */}
            {!email.trim() && (
              <p className="text-center text-[11px] text-zinc-400">
                Enter your email above to continue
              </p>
            )}
          </form>

          {/* Notice / State Feedback */}
          {notice && (
            <div className={`mt-4 rounded-lg border px-4 py-3 text-sm text-center leading-relaxed ${
              state === "authenticated" ? "bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-200" :
              state === "error" ? "bg-red-50 border-red-100 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200" :
              "bg-amber-50 border-amber-100 text-amber-800 dark:bg-amber-950 dark:border-amber-900 dark:text-amber-200"
            }`}>
              {notice}
              {state === "error" && (
                <button onClick={handleRetry} className="block mx-auto mt-2 text-xs font-medium underline underline-offset-2 hover:opacity-80">
                  Try again
                </button>
              )}
            </div>
          )}

          {/* Privacy Notice */}
          <p className="mt-6 text-center text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
            All calculations happen locally in your browser.<br />
            We never store or share your financial data.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          By continuing, you agree to FinKit&rsquo;s{" "}
          <a href="/terms" className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300">Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300">Privacy Policy</a>
          .
        </p>
      </div>
    </div>
  );
}
