import random
import string
import os
import re

POOL_SIZE = 8        # pool 里有多少个跳转路径
CODE_LENGTH = 5      # 每个跳转文件名的长度
FOLDER = "."         # 主目录

# 生成随机 5 位字符串
def gen_code():
    chars = string.ascii_lowercase + string.digits
    return ''.join(random.choice(chars) for _ in range(CODE_LENGTH))

# 生成整个 pool
def gen_pool(n):
    return [list(gen_code()) for _ in range(n)]

# 生成跳转 HTML 文件
def make_redirect_html(filename):
    html = f"""
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=https://fightedu.qzz.io/rl">
<title>loading...</title>
</head></html>
    """
    with open(f"{filename}.html", "w", encoding="utf-8") as f:
        f.write(html)

# 读取 index.html
with open("index.html", "r", encoding="utf-8") as f:
    index = f.read()

# 生成 pool
new_pool = gen_pool(POOL_SIZE)

# 把 pool 插入 index.html
def format_js_array():
    arrs = [ str(list(code)) for code in new_pool ]
    return "const pool = [\n    " + ",\n    ".join(arrs) + "\n];"

index_new = re.sub(r"const pool = \[[\s\S]*?\];", format_js_array(), index)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(index_new)

# 为池子中的每个 code 创建跳转 html 页面
for code in ["".join(x) for x in new_pool]:
    make_redirect_html(code)

print("更新完成！")
