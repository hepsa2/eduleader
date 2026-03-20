/**
 * Cloudflare Worker - 教育守望 API 中转层
 * 
 * 功能：
 * 1. 验证 hCaptcha token
 * 2. 安全调用 GitHub API 创建 issue
 * 3. 获取 issue 列表
 */

// CORS 头设置
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * 验证 hCaptcha token
 */
async function verifyHCaptcha(token, secret) {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `response=${token}&secret=${secret}`,
  });
  
  const data = await response.json();
  return data.success === true;
}

/**
 * 创建 GitHub Issue
 */
async function createGitHubIssue(title, body, env) {
  const url = `https://api.github.com/repos/${env.REPO_OWNER}/${env.REPO_NAME}/issues`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'Eduleader-Worker',
    },
    body: JSON.stringify({
      title,
      body,
      labels: [env.ISSUE_LABEL || '投稿'],
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * 获取 GitHub Issues 列表
 */
async function getGitHubIssues(env) {
  const url = `https://api.github.com/repos/${env.REPO_OWNER}/${env.REPO_NAME}/issues?labels=${encodeURIComponent(env.ISSUE_LABEL || '投稿')}&state=open&per_page=100&sort=created&direction=desc`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'Eduleader-Worker',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * 处理 POST /submit - 提交投稿
 */
async function handleSubmit(request, env) {
  try {
    const data = await request.json();
    const { title, body, captchaToken } = data;
    
    // 1. 验证必填字段
    if (!title || !body || !captchaToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '缺少必填字段' 
        }),
        { 
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 2. 验证 hCaptcha
    const isHuman = await verifyHCaptcha(captchaToken, env.HCAPTCHA_SECRET);
    if (!isHuman) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '人机验证失败，请重试' 
        }),
        { 
          status: 403,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 3. 创建 GitHub Issue
    const issue = await createGitHubIssue(title, body, env);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        issueNumber: issue.number,
        issueUrl: issue.html_url,
      }),
      { 
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Submit error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || '提交失败，请稍后重试' 
      }),
      { 
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * 处理 GET /issues - 获取投稿列表
 */
async function handleGetIssues(env) {
  try {
    const issues = await getGitHubIssues(env);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        issues,
      }),
      { 
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Get issues error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || '获取投稿列表失败' 
      }),
      { 
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * 主处理函数
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: CORS_HEADERS,
      });
    }
    
    // 路由处理
    if (url.pathname === '/submit' && request.method === 'POST') {
      return handleSubmit(request, env);
    }
    
    if (url.pathname === '/issues' && request.method === 'GET') {
      return handleGetIssues(env);
    }
    
    // 根路径 - 返回 API 信息
    if (url.pathname === '/') {
      return new Response(
        JSON.stringify({ 
          name: 'Eduleader API',
          version: '1.0.0',
          endpoints: {
            submit: 'POST /submit',
            issues: 'GET /issues',
          }
        }),
        { 
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 404
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { 
        status: 404,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );
  },
};
