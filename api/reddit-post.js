// Vercel Serverless Function — Reddit Post Proxy
// Deploys to: getfinkit.com/api/reddit-post
// Runs on Vercel's US servers, so Reddit sees a US IP

export const maxDuration = 30; // seconds — moved from vercel.json


export default async function handler(req, res) {
  // CORS — allow from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { title, content, subreddit, kind } = req.body || {};

  if (!title || !subreddit) {
    return res.status(400).json({ error: 'Missing title or subreddit' });
  }

  const REDDIT_USER = process.env.REDDIT_USER;
  const REDDIT_PASS = process.env.REDDIT_PASS;
  const REDDIT_CLIENT = process.env.REDDIT_CLIENT;
  const REDDIT_SECRET = process.env.REDDIT_SECRET;

  if (!REDDIT_USER || !REDDIT_PASS || !REDDIT_CLIENT || !REDDIT_SECRET) {
    return res.status(500).json({ error: 'Reddit credentials not configured on server' });
  }

  try {
    // Step 1: Get OAuth token
    const tokenRes = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${REDDIT_CLIENT}:${REDDIT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'FinKit/1.0 (by /u/' + REDDIT_USER + ')'
      },
      body: `grant_type=password&username=${encodeURIComponent(REDDIT_USER)}&password=${encodeURIComponent(REDDIT_PASS)}`
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return res.status(401).json({ error: 'Reddit auth failed', detail: tokenData });
    }
    const accessToken = tokenData.access_token;

    // Step 2: Submit post
    const postRes = await fetch('https://oauth.reddit.com/api/submit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'FinKit/1.0 (by /u/' + REDDIT_USER + ')'
      },
      body: new URLSearchParams({
        sr: subreddit,
        kind: kind || 'link',
        title: title,
        url: content,  // For link posts, content is the URL
        resubmit: 'true',
        api_type: 'json'
      }).toString()
    });

    const postData = await postRes.json();

    if (postData.json?.errors?.length > 0) {
      return res.status(400).json({ error: 'Reddit rejected post', detail: postData.json.errors });
    }

    const postUrl = postData.json?.data?.url || 'https://reddit.com' + postData.json?.data?.permalink;

    return res.status(200).json({
      success: true,
      url: postUrl,
      id: postData.json?.data?.id,
      message: 'Post created from US IP ✅'
    });

  } catch (err) {
    return res.status(500).json({ error: 'Request failed', detail: err.message });
  }
}

// Edge runtime note: set runtime: 'nodejs18' in vercel.json for this function
