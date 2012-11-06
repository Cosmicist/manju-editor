# Manju Editor #

Manju is a lightweight rich text editor made as a jQuery plugin. It's under 7kb
minified and around 15kb uncompressed.
It's ideal to use in your projects when you need to enable the user to visually
edit content, and, of course, it also allows source code viewing/editing.

## Usage

Include the script and styles, and don't forget jQuery!
```html
<link rel="stylesheet" href="css/jquery.manju.css">

<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="js/jquery.manju.js"></script>
```

_It is recommended to include the scripts just before closing the body tag._

Now it's as simple as calling `manju()` on a textarea or any other element
that you wish to make editable:

```javascript
$('.editable').manju();
```

Actual docs coming soon...

## License

Manju editor is licensed under the MIT license:

Copyright (c) 2012 Luciano Longo

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Ligature Symbols Font Copyright

This font is the work of [Kazuyuki Motoyama](http://kudakurage.com/ligature_symbols/)
which is licensed by him under the
[SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).
I do NOT own this font.