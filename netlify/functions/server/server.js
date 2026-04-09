const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

exports.handler = async (event) => {
  let pathInfo = event.path || '/'

  if (pathInfo === '/') pathInfo = '/index.php'
  if (pathInfo === '/tools') pathInfo = '/tools/index.php'

  const phpPath = path.join(__dirname, '../../../', pathInfo)

  try {
    const output = execSync(`php "${phpPath}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: output
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: '页面不存在或 PHP 错误'
    }
  }
}
