(function($)
{
    $.manju = {
        defaults: {
            toolbars: {
                font: [
                    { title:'Font', class:'manju-font', cmd: 'fontname', values: [
                        'Sans-serif',
                        'Serif',
                        'Arial',
                        'Helvetica',
                        'Courier New',
                        'Garamond',
                        'Georgia',
                        'Tahoma',
                        'Trebuchet MS',
                        'Verdana'
                    ] },
                    { title:'Font color', html:'color', class:'manju-color picker', cmd: {
                        command: 'forecolor',
                        callback: function( btn )
                        {
                            var api = this,
                                pos = btn.offset(),
                                picker = this.ui.wrap.find('.forecolor-picker');

                            if( ! picker.length )
                            {
                                picker = $('<div class="forecolor-picker">').appendTo( this.ui.wrap );

                                // Create a table
                                var t = '<table class="items symbol">';

                                for( var group in $.manju.colors )
                                {
                                    var line = $.manju.colors[group];

                                    t += '<tr class="'+group+'">';
                                    for( var i in line )
                                    {
                                        var rgb = line[i];
                                        t += '<td><div class="item" data-value="rgb('+rgb+')" style="background: rgb('+rgb+');" title="RGB ('+rgb+')"><span>check</span></div></td>';
                                    }
                                    t += '</tr>';
                                }

                                picker.html( t ).find('.item').click(function(e)
                                {
                                    // Apply forecolor to selection
                                    api.cmd( 'forecolor', $(this).data('value') );

                                    // Hide the picker
                                    picker.fadeOut('fast');
                                });

                                this.ui.wrap.click(function(e)
                                {
                                    if( ! $(e.target).parent().hasClass('manju-color') )
                                    {
                                        picker.fadeOut('fast');
                                    }
                                });

                                // Run a check for all the commands to mark the
                                // correct item as selected
                                this.checkCommands();
                            } // End picker creation

                            picker.css({
                                top: pos.top + btn.outerHeight(),
                                left: pos.left
                            });

                            if( picker.is(':visible') )
                                picker.fadeOut('fast');
                            else
                                picker.fadeIn('fast');
                        }
                    } }
                ],
                style: [
                    { title:'Bold', html:'bold', class:'manju-bold', cmd: 'bold' },
                    { title:'Italic', html:'italic', class:'manju-italic', cmd: 'italic' },
                    { title:'Underline', html:'underline', class:'manju-underline', cmd: 'underline' },
                    { title:'Strikethrough', html:'strike', class:'', cmd: 'strikethrough' }
                ],
                alignment: [
                    { title:'left', html:'alignleft', class:'manju-bold', cmd: 'justifyleft' },
                    { title:'center', html:'aligncenter', class:'manju-bold', cmd: 'justifycenter' },
                    { title:'right', html:'alignright', class:'manju-bold', cmd: 'justifyright' },
                    { title:'justify', html:'alignadjust', class:'manju-bold', cmd: 'justifyfull' },
                ],
                linking: [
                    { title:'Hyperlink', html:'link', class:'manju-link', cmd: {
                        command: 'createlink',
                        callback: function() {
                            var url = prompt('Enter URL (leave blank to unlink)', '');
                            console.log( this.ui );

                            if( url == '' )
                                this.cmd('unlink');
                            else
                            {
                                if( url.match('^\/\/') )
                                    url = 'http:'+url;

                                this.cmd('createlink', url);
                            }
                        }
                    } }
                ],
                lists: [
                    { title:'Unordered list', html:'list', class:'manju-list', cmd: 'insertUnorderedList' },
                    { title:'Ordered list', html:'list', class:'manju-list', cmd: 'insertOrderedList' }
                ],
                indentation: [
                    { title:'Outdent', html:'left', class:'manju-list', cmd: 'outdent' },
                    { title:'Indent', html:'right', class:'manju-list', cmd: 'indent' }
                ],
                clipboard: [
                    { title:'Cut', html:'cut', class:'manju-cut', cmd: 'cut' },
                    { title:'Copy', html:'copy', class:'manju-copy', cmd: 'copy' },
                    { title:'Paste', html:'file', class:'manju-paste', cmd: 'paste' }
                ],
                history: [
                    { title:'Undo', html:'undo', class:'manju-undo', cmd: 'undo' },
                    { title:'redo', html:'<span class="flip">undo</span>', class:'manju-redo', cmd: 'redo' }
                ],
                misc: [
                    { title:'Source', html:'code', class:'manju-viewsource', cmd: function() { this.sourceToggle(); } }
                ]
            }
        },
        colors: {
            grays: [
                '0, 0, 0', '68, 68, 68', '102, 102, 102', '153, 153, 153',
                '204, 204, 204', '238, 238, 238', '243, 243, 243', '255, 255, 255'
            ],
            misc: [
                '255, 0, 0', '255, 153, 0', '255, 255, 0', '0, 255, 0',
                '0, 255, 255', '0, 0, 255', '153, 0, 255', '255, 0, 255',
            ],
            sw1: [
                '244, 204, 204', '252, 229, 205', '255, 242, 204', '217, 234, 211',
                '208, 224, 227', '207, 226, 243', '217, 210, 233', '234, 209, 220'
            ],
            sw2: [
                '234, 153, 153', '249, 203, 156', '255, 229, 153', '182, 215, 168',
                '162, 196, 201', '159, 197, 232', '180, 167, 214', '213, 166, 189'
            ],
            sw3: [
                '224, 102, 102', '246, 178, 107', '255, 217, 102', '147, 196, 125',
                '118, 165, 175', '111, 168, 220', '142, 124, 195', '194, 123, 160'
            ],
            sw4: [
                '204, 0, 0', '230, 145, 56', '241, 194, 50', '106, 168, 79',
                '69, 129, 142', '61, 133, 198', '103, 78, 167', '166, 77, 121'
            ],
            sw5: [
                '153, 0, 0', '180, 95, 6', '191, 144, 0', '56, 118, 29',
                '19, 79, 92', '11, 83, 148', '53, 28, 117', '116, 27, 71'
            ],
            sw6: [
                '102, 0, 0', '120, 63, 4', '127, 96, 0', '39, 78, 19',
                '12, 52, 61', '7, 55, 99', '32, 18, 77', '76, 17, 48'
            ]
        }
    }

    var Manju = function( elem, options )
    {
        if( $(elem).data('{{manju}}') ) return; // Already converted

        var _this = this,
            o = $.extend( {}, $.manju.defaults, options || {});

        var $wrap = $('<div class="manju-wrap">').insertBefore( elem ),
            $tbwrap = $('<div class="manju-toolbar-wrap">'),
            $ta, $e;

        if( elem.tagName == 'TEXTAREA' )
        {
            $ta = $(elem).appendTo($wrap);
            $e  = $('<div>').insertBefore($ta).html( $ta.val() );
        }
        else
        {
            $e  = $(elem).appendTo($wrap);
            $ta = $('<textarea>').insertAfter( $e ).val( $.trim( $e.html() ) );
        }
        $e.addClass('editable-area').attr('contenteditable', true);
        $ta.addClass('manju-source');

        _cmd('styleWithCss');

        // Render toolbars

        $tbwrap.insertBefore( $e );
        
        $.each( o.toolbars, function( name, buttons )
        {
            // Add a toolbar div
            var $tbar = $('<div class="manju-toolbar manju-toolbar-'+name+'">'), content;
            for( var i in buttons )
            {
                var b = buttons[i];

                $b = $('<div class="manju-toolbar-button '+b.class+'" title="'+b.title+'">')
                    .appendTo( $tbar );

                if( typeof b.cmd !== 'function' )
                    $b.data('manju-command', typeof b.cmd.command == 'string' ? b.cmd.command : b.cmd );

                if( typeof b.values == 'object' )
                {
                    var sel = '<select class="'+b.class+'"><option selected>'+b.title+'</option>';

                    for( var i in b.values )
                    {
                        var val = b.values[i];
                            arg = i;

                        if( ! isNaN( parseInt(arg) ) )
                            arg = val;

                        sel += '<option value="'+arg+'">'+val+'</option>';
                    }
                    sel += '</select>';

                    $(sel).appendTo($b).change(function()
                    {
                        if( $(this).val() )
                            _cmd( $(this).parent().data('manju-command'), $(this).val() );
                    });
                }
                else
                {
                    $b.html('<button type="button" class="'+b.class+'">'+ ( b.html || '&nbsp;' ) +'</button>');

                    $b.click( (function( cmd )
                    {
                        return function(e)
                        {
                            if( typeof cmd == 'function' )
                            {
                                cmd.apply( _this, [$(this)] );
                                return;
                            }
                            else if( typeof cmd.callback == 'function' )
                            {
                                cmd.callback.apply( _this, [$(this)] );
                                return;
                            }

                            if( ! $.isArray( cmd ) )
                                cmd = [cmd];

                            _cmd.apply( _this, cmd );
                        }
                    })( b.cmd ) );
                }
            }
            $tbwrap.append( $tbar );
        });

        // Public vars
        this.config = o;
        this.ui = {
            wrap: $wrap,
            toolbar: $tbwrap,
            textarea: $ta,
            editarea: $e
        };

        // Keep areas sync'ed when sending the form
        var $form = $e.parents('form');
        if( $form.length )
        {
            $form.submit(function(e) { _syncTextarea(); });
        }

        // Query command states/values
        $e.keydown( _checkCommands ).click( _checkCommands );

        function _checkCommands()
        {
            $tbwrap.find('.manju-toolbar-button').each(function()
            {
                var cmd = $(this).data('manju-command');

                if( typeof cmd !== 'undefined' )
                {
                    $(this).removeClass('active');

                    var select = $(this).children('select');

                    if( select.length )
                    {
                        var cmdval = document.queryCommandValue( cmd ),
                            opt    = $(select[0]).find('[value="'+cmdval+'"]');

                        select[0].selectedIndex = 0;

                        if( opt.length )
                            select[0].selectedIndex = opt.index();
                    }
                    else if( $.isArray( cmd ) || select.length )
                    {
                        var cmdval = document.queryCommandValue( cmd[0] ).replace(/[\s]+/ig, ''),
                            val    = cmd[1].replace(/[\s]+/ig, '');

                        if( cmdval == val )
                            $(this).addClass('active');
                    }
                    else if( $(this).hasClass('picker') )
                    {
                        var val = document.queryCommandValue( cmd ),
                            picker = $('.'+cmd+'-picker');

                        picker.find('.item').removeClass('active');

                        if( picker.length )
                            picker.find('.item[data-value="'+val+'"]').addClass('active');
                    }
                    else
                    {
                        if( document.queryCommandState(cmd) )
                            $(this).addClass('active');
                    }
                }
            });
        }
        this.checkCommands = _checkCommands;


        /* API */

        function _cmd( cmd, value )
        {
            $e.focus();
            document.execCommand( cmd, null, value );
            _checkCommands();
            $e.focus();
        }
        this.cmd = _cmd;

        /**
         * Syncs textarea with editable area
         */
        function _syncTextarea()
        {
            $ta.val( $.trim( $e.html() ) );
        }
        this.syncTextarea = _syncTextarea;

        /**
         * Syncs editable area with textarea
         */
        function _syncEditableArea()
        {
            $e.html( $ta.val() );
        }
        this.syncEditableArea = _syncEditableArea;

        function _sourceToggle()
        {
            if( $ta.is(':visible') )
            {
                this.cmdstatus = true;
                $ta.hide();
                $e.show().focus();
                _syncEditableArea();
                $tbwrap.removeClass('disabled');
                _enableButtons();
            }
            else
            {
                this.cmdstatus = false;
                $ta.show().height( $e.height() ).focus();
                $e.hide();
                _syncTextarea();
                $tbwrap.addClass('disabled');
                _disableButtons();
            }
        }
        this.sourceToggle = _sourceToggle;

        function _enableButtons()
        {
            $tbwrap.find(':input').attr('disabled', false);
        }

        function _disableButtons()
        {
            $tbwrap.find(':input:not(.manju-viewsource)').attr('disabled', true);
        }
    }

    $.fn.manju = function( options )
    {
        return $(this).each(function()
        {
            $(this).data('{{manju}}', new Manju(this, options) );
        });
    };
})(jQuery);