#!/usr/bin/env python3
import re,sys,zipfile
from pathlib import Path
apk=Path(sys.argv[1])
assert apk.exists(), f"APK no encontrado: {apk}"
with zipfile.ZipFile(apk) as z:
    entries=set(z.namelist())
    assets={x[len('assets/public/'):] for x in entries if x.startswith('assets/public/')}
    assert 'assets/public/play.html' in entries, 'Falta assets/public/play.html'
    html=z.read('assets/public/play.html').decode('utf-8')
    refs=[]
    for m in re.finditer(r'(?:src|href)="([^"]+)"',html):
        ref=m.group(1).split('#',1)[0]
        if not ref or ref.startswith(('#','http:','https:','mailto:','data:')) or ref in ('./','../'): continue
        refs.append(ref.lstrip('/'))
    missing=sorted(set(r for r in refs if r not in assets and not r.endswith('/')))
    if missing: raise SystemExit('Recursos de play.html ausentes en APK:\n'+'\n'.join(missing))
    for name in ('assets/public/index.html','assets/public/exam.html','assets/public/teacher.html'):
        if name not in entries: continue
        text=z.read(name).decode('utf-8')
        for m in re.finditer(r'(?:src|href)="([^"]+)"',text):
            ref=m.group(1).split('#',1)[0]
            if not ref or ref.startswith(('#','http:','https:','mailto:','data:')) or ref in ('./','../'): continue
            ref=ref.lstrip('/')
            if ref.endswith(('.js','.css','.html','.webmanifest')) and ref not in assets:
                raise SystemExit(f'Recurso ausente en APK ({name}): {ref}')
    print(f'APK package audit OK: {len(assets)} public assets; {len(set(refs))} play.html references verified.')
