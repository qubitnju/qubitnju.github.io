/**
 * 【注】
 * 在插件的环境里， this关键字代表了这个插件将要执行的jQuery对象
 * 此处没有必要将this包在$号中如$(this)，因为this已经是一个jQuery对象
 * 因此，直接使用 this 即可
 */

/**
 * 插件名称: SlidingBlock
 * jQuery导航条  滑块伴随鼠标移动特效
 */
// 定一个闭包区域，防止插件"污染"
// 闭包限定命名空间
;(function ($) {
	// 定义插件名称
	var pluginName = "SlidingBlock";
	
	// 定义组件的默认配置参数  default settings
	var defaults = {
		event_type:'mouseenter',
		cur_idx: 0,// 当前导航项的index 值
		cur_class:'current',// 当前导航项的class
		slider_tm: 400,//滑块滑动时间
		delay_tm: 300,//鼠标在元素上快速移入移出的时候不触发元素的mouseenter事件，而当鼠标移入元素，并停留超过300毫秒，便触发某些方法
		slider_h: '4px',//滑块高度   需要写单位
		slider_btm: 0,//滑块bottom 定位 需要写单位
		slider_class:'sliding-block',//滑块的通用class
		before_show:true,//滑块展示在前
		cur_show:false,//滑块滑动过程中，当前导航项下有固定滑块
		ele_inner:'ul',//默认导航结构 ul>li>a
		ele_child:'li'//默认导航结构 ul>li>a
	}
	
	/**
	 * 定义组件的构造函数
	 * 
	 * this.settings = $.extend(this, {}, defaults, options) ：
	 * jquery的extend()方法作用是合并另个对象，有相同的则覆盖，没有相同的则添加。
	 * 也就是说，上面这行代码中options对象中的参数会覆盖defaults对象中同名的参数，
	 * 这就实现了配置参数自定义的目的。
	 */
	/**
	 * @constructor Plugin
	 * @param {Object} elements
	 * @param {Object} options
	 */
	function Plugin (elements, options) {
		this.elements = elements;
		this._defaults = defaults;
		this._name = pluginName;//插件名
		this.settings = $.extend(this, {}, defaults, options);//默认配置参数  default settings
		this.init();// 初始化
	}
	
	// 定义插件的行为
	Plugin.prototype = { //全局变量
		init: function () { // 初始化
			var _this = this,// Plugin
				_ele = $(_this.elements),// nav-list-w
				_ele_inner = _ele.children(_this.settings.ele_inner),// ul.nav-list
				_ele_child = _ele_inner.children(_this.settings.ele_child); //li
			//滑块
			var slider_fix = '<div class="'+_this.settings.slider_class+'"></div>';//固定的滑块
			var slider_move = '<div class="'+_this.settings.slider_class +' '+ _this.settings.slider_class+'-move'+ '"></div>';//伴随鼠标移动的滑块
			var _slider_fix = $(slider_fix),
				_slider_move = $(slider_move);
				
			//初始化设置当前导航
			var _cur_idx = _this.settings.cur_idx,
				cur_nav = _ele_child.eq(_cur_idx),//当前导航项
				cur_nav_left = cur_nav.offset().left,
				cur_nav_p_left = cur_nav.position().left,
				cur_nav_m_left = parseInt(cur_nav.css('margin-left')),
				cur_nav_w = cur_nav.width(),
				cur_nav_outerW = cur_nav.outerWidth();
			//当前导航项添加class标识
			cur_nav.addClass(_this.settings.cur_class).siblings().removeClass(_this.settings.cur_class);
			//设置滑块样式
			_slider_fix.css({
				'position':'absolute',
				'bottom': _this.settings.slider_btm,
				'height': _this.settings.slider_h
			});
			_slider_move.css({
				'position':'absolute',
				'bottom': _this.settings.slider_btm,
				'height': _this.settings.slider_h
			});
			if (_this.settings.before_show) {//滑块展示在前
				_slider_fix.appendTo(cur_nav).css({
					'left': 0,
					'width':cur_nav_w
				});
				_slider_move.appendTo(cur_nav).css({
					'left': 0,
					'width':cur_nav_w
				});
			} else{//滑块展示在后
				_slider_fix.appendTo(_ele).css({
					'z-index': 0,
					'width':cur_nav_w,
					'left': cur_nav_p_left + cur_nav_m_left
				});
				_slider_move.appendTo(_ele).css({
					'z-index': 0,
					'width':cur_nav_w,
					'left': cur_nav_p_left + cur_nav_m_left
				});
			}
			
			//cur_show=true 则显示固定的滑块
			if (_this.settings.cur_show ){
				_slider_fix.css('visibility','visible');
			} else {
				_slider_fix.css('visibility','hidden');
			}
			//调用鼠标 hover 事件（mouseenter+mouseleave）
			_this.mouseFollow(_this, cur_nav_left, cur_nav_p_left, cur_nav_m_left, cur_nav_w , _slider_move);
			
		},
		mouseFollow: function (_this, cur_nav_left, cur_nav_p_left, cur_nav_m_left, cur_nav_w, _slider_move) {
			var _ele = $(_this.elements);// ul
			var _timer = null;
			_ele.stop(true, true).on(_this.settings.event_type,_this.settings.ele_child,function (e) {
				var _li = $(this),
					_liWidth= _li.outerWidth(),
					_li_w = _li.width(),
					_liLeft= _li.offset().left,
					_liPosLeft= _li.position().left,
					_liMarLeft= parseInt(_li.css('margin-left'));
				if (_timer) {
		            clearTimeout(_timer);
		        }
				if (_this.settings.before_show) {//滑块展示在前
					_timer = setTimeout(function() {
						_slider_move.stop(true, true).animate({
							'width':_liWidth,
							'left': _liLeft - cur_nav_left
						}, _this.settings.slider_tm);
					},_this.settings.delay_tm);
				} else {//滑块展示在后
					_timer = setTimeout(function() {
						_slider_move.stop(true, true).animate({
							'width':_li_w,
							'left': _liPosLeft + _liMarLeft
						}, _this.settings.slider_tm);
					},_this.settings.delay_tm);
				}
				_li.addClass('active').siblings().removeClass('active');
				
			});
			_ele.mouseleave(function() {
				if (_timer) {
		            clearTimeout(_timer);
		            _timer = null;
		        }
				if (_this.settings.before_show) {//滑块展示在前
					_slider_move.stop(true, true).animate({
						'width':cur_nav_w,
						'left': 0
					}, _this.settings.slider_tm);
				} else {//滑块展示在后
					_slider_move.stop(true, true).animate({
						'width':cur_nav_w,
						'left': cur_nav_p_left + cur_nav_m_left
					}, _this.settings.slider_tm);
				}
				$(_this.settings.ele_child).removeClass('active');
			});
		}
	}
	
	// 向jQuery注册组件 jQuery.fn.extend(object)扩展jquery 方法，制作插件
	$.fn[ pluginName ] = function (options) {   //向jQuery注册插件
	    var _this = this;
	    _this.each(function() {
	        $.data( _this, "plugin_" + pluginName, new Plugin( this, options ) );
	    });
	    return _this;
	};
	
})(jQuery);
