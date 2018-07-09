let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/apache/gameHtml
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +1 index.html
badd +1 game.html
badd +1 js/BasketGame
badd +1 js/Game
badd +1 js/interact.min.js
badd +1 js/jquery-3.3.1.min.js
badd +1 js/snackbar.js
badd +1 css/BasketGame
badd +1 css/snackbar.css
badd +1 css/styles.css
badd +59 js/Game/drag.js
badd +1 js/Game/image.js
argglobal
silent! argdel *
$argadd index.html
$argadd game.html
$argadd js/BasketGame
$argadd js/Game
$argadd js/interact.min.js
$argadd js/jquery-3.3.1.min.js
$argadd js/snackbar.js
$argadd css/BasketGame
$argadd css/snackbar.css
$argadd css/styles.css
$argadd js/Game/drag.js
$argadd js/Game/image.js
edit index.html
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=1 winheight=1 winminwidth=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 92 + 92) / 185)
exe 'vert 2resize ' . ((&columns * 92 + 92) / 185)
argglobal
let s:l = 13 - ((12 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 0
wincmd w
argglobal
if bufexists('js/Game/image.js') | buffer js/Game/image.js | else | edit js/Game/image.js | endif
let s:l = 1 - ((0 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 92 + 92) / 185)
exe 'vert 2resize ' . ((&columns * 92 + 92) / 185)
tabnext 1
if exists('s:wipebuf') && s:wipebuf != bufnr('%')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOc
set winminheight=1 winminwidth=1
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
