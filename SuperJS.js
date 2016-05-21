// JavaScript source code
/*-----------------张杨----------------------------*/
//功能：打开一般窗口。
//参数：url:要打开的地址
//     width:打开窗体的高度。
//     height:打开窗体的高度。
//     top:距离主窗口的上部的高度
//     left:距主窗口左边的宽度
/*-----------------2016-5-10-----------------------------------*/
function OpenNormalWindow(url, top, left, width, height, source) {
    var winobj = {};
    winobj.width = width;
    winobj.height = height;
    winobj.top = top;
    winobj.left = left;
    window.showModalDialog(url, source, 'status:false;dialogHeight:' + winobj.height + 'px;dialogWidth:' + winobj.width + 'px;dialogLeft:' + winobj.left + 'px;dialogTop:' + winobj.top + 'px;scrollbar=no;help: no;resizable:no;status:no;');
}
//2016-5-21张杨
//selectID:下拉框的ID属性，options:下拉框要显示的数据，value:默认选中的select值，onchange:选项变化要绑定的事件，enabled：是否有用,width：下拉框的宽度。
function getDropdownHtml(selectID,options,value,onchange,enabled,width)
{
    if(!options)
    {
        return "&nbsp;";
    }
    if(typeof options=='string')
    {
        try{
            options=$.stringToJSON(options);
        }catch(ex){
            options = eval('('+options+')');
        }
    }
    onchange=(onchange!=null?stringFormat(' onchange="{0}"',onchange):'');
    enabled=((enabled!=null&&enabled==false)?' disabled="disabled"':'');
    width = (width != null ? " style='width:'" + width + ";'" : "style='width:100%;'");
    var html = stringFormat('<select{0} class="font" {1} {2} {3}>', getIDString(selectID), onchange, enabled, width);
    $.each(options, function (i, option) {
        html += stringFormat('<option value="{1}" {2} {3}>{0}</option>', option.text, option.value, ((value != null && option.value == value) ? ' selected="selected"' : ''), (null != option.style ? "style='" + option.style + "'" : ''));
    });
    html += '</selected>';
    return html;
}
function stringFormat() {
    // var k = $.makeArray(arguments).slice(1);
    // modify by： wenghq 2013-05-10, 原因： 用原生方法将arguments转换成数组的效率比用jquery方法要好。
    var k;
    if (arguments.length == 2 && arguments[1] instanceof Array) {// add by evan 2013-09-09 支持直接传数组
        k = arguments[1];
    }
    else {
        k = Array.prototype.slice.call(arguments, 1);
    }
    f = (!arguments.length || arguments[0] === undefined) ? "" : arguments[0];
    return f.replace(/\{(\d+)\}/g, function (i, h) { return typeof k[h] !== 'undefined' ? k[h] : ""; });
}
//2016-5-21张杨
//txtID:文本框的ID;length:文本框的长度;onfocus:获取焦点事件;onblur:失去焦点事件;value:默认值;readonly:是否只读;width:文本框的宽度;
//talign:文本框中的内容对齐方式;className:文本框的样式;title:标题;style:样式;onpropertychange:property(属性)change(改变)的时候，触发事件;
function getTextBoxHtml(txtID, length, onfocus, onblur, value, readonly, width, talign, className, title, style, onpropertychange)
{
    alert("Hello");
    var onkeyup = ((length != null && length > 0) ? stringFormat(' onkeyup="checkSize(this,{0})"', length) : '');
    onfocus = stringFormat(' onfocus="{0};setIDText(this,0)"', (onfocus != null ? onfocus : ''));
    onblur = stringFormat(' onblur="{0};setIDText(this,1)"', (onblur != null ? onblur : ''));
    value = (value != null ? stringFormat(' value="{0}"', value) : '');
    width = (width != null ? stringFormat("style='width:" + width + ";{0}'", talign != null ? "text-align:" + talign : "") : stringFormat("style='width:98%;{0}'", talign != null ? "text-align:" + talign : ""));
    title = (title != null ? stringFormat(' title="{0}"', title) : '');
    style = (style != null ? stringFormat(' style="{0}"', style) : '');
    onpropertychange = (onpropertychange != null ? stringFormat(' onpropertychange="{0}"', onpropertychange) : '');
    if(readonly)
    {
        onkeyup = ' readonly="true"';
        onfocus = '';
        onblur = '';
    }
    className = readonly ? 'graytext' : ((className == null ? "text" : className));
    return stringFormat('<input {0} type="text" {5} class="{6}" {1} {2} {3} {4} {7} {8} {9}/>',getIDString(txtID),value,onkeyup,onfocus,onblur,width,className,title,style,onpropertychange);
}
function checkSize(txt, size) {
    // edit by chengam 20130929
    if (txt.readOnly) {
        return false;
    }
    if (txt.value.indexOf("'") != -1) {
        txt.value = txt.value.replace(/[\']/g, "’");
    }
    if (txt.value.replace(/[^\x00-\xff]/g, '**').length <= size) {
        return false;
    }

    txt.value = getStringByLength(txt.value, size, false);
}
