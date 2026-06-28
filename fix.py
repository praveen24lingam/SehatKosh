import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fix params: { ... } -> Promise<{ ... }> and await params
    # E.g. { params }: { params: { memberId: string } }
    # First we match the function declaration
    
    def replace_params(match):
        func_type = match.group(1) # GET, POST, etc
        req_arg = match.group(2) # request: Request, etc
        param_name = match.group(3) # memberId
        
        return f"export async function {func_type}({req_arg}, {{ params }}: {{ params: Promise<{{ {param_name}: string }}> }}) {{\n  try {{\n    const {{ {param_name} }} = await params;"

    # But we already fixed one file, so we can use a more general approach or just target specific files
    # Actually, it's easier to just do it via regex for the other route params
    content = re.sub(
        r'export async function (GET|POST|PUT|DELETE)\(([^,]+), \{ params \}: \{ params: \{ ([a-zA-Z0-9_]+): string \} \} \) \{\n\s*try \{',
        replace_params,
        content
    )
    
    # 2. Fix cookies().get -> cookieStore.get
    # Add const cookieStore = await cookies(); right after try {
    # If the file uses createServerClient and cookies().get
    if 'cookies().get(' in content:
        # insert cookieStore
        # We need to insert it right before createServerClient
        content = re.sub(
            r'const supabase = createServerClient',
            'const cookieStore = await cookies();\n    const supabase = createServerClient',
            content
        )
        content = content.replace('cookies().get(name)', 'cookieStore.get(name)')
    
    # 3. Fix cookies() in health-card/[memberId]/page.tsx
    # It might have a different pattern.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# We want to process all route.ts and page.tsx files
for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            fix_file(os.path.join(root, file))

print("Done")
