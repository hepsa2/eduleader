import random
import string
import os
import re

POOL_SIZE = 8        # pool 中路径数量
CODE_LENGTH = 5      # 跳转文件名长度（如 abc12 = 5）
FOLDER = "."         # 当前目录

# 生成随机 5 位字符串
def gen_code():
    chars = string.ascii_lowercase + string.digits
    return ''.join(random.choice(chars) for _ in range(CODE_LENGTH))

# 生成 pool
def gen_pool(n):
    return [list(gen_code()) for _ in range(n)]

# 创建跳转 HTML
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

# ★★★ ① 删除旧跳转文件（必须放最前面）
for f in os.listdir("."):
    if f.endswith(".html") and len(f.split(".")[0]) == CODE_LENGTH:
        print("删除旧文件:", f)
        os.remove(f)

# ② 生成新的 pool
new_pool = gen_pool(POOL_SIZE)

# ③ 更新 index.html 中的 pool 内容
with open("index.html", "r", encoding="utf-8") as f:
    index = f.read()

def js_pool():
    arrs = [str(list(code)) for code in new_pool]
    return "const pool = [\n    " + ",\n    ".join(arrs) + "\n];"

index_new = re.sub(r"const pool = \[[\s\S]*?\];", js_pool(), index)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(index_new)

# ④ 为 pool 中每个 code 生成新的 html 文件
for code in ["".join(x) for x in new_pool]:
    print("创建跳转文件:", code + ".html")
    make_redirect_html(code)

print("全部完成！")
