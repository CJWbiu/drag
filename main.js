function Ghost(data, target, options) {
  this.target = $(target);  //放置目标
  this.options = options; //回调
  this.data = data; //绑定的数据
  this._init();
}
Ghost.uid = 0;  //唯一值
Ghost.prototype._init = function(x, y) {
  this._createTemplate(); //创建dom
  this.lock = true; //默认不可移动
  this._initStyle();
  this._initEvent();
  this.target.append(this.$el);
  Ghost.uid++;
}
Ghost.prototype._initStyle = function() {
  //生成id
  this.id = 'ghost' + new Date().getTime() + Ghost.uid;
  this.$el.attr('id', this.id);
  this.$el.css({'position':'absolute'});
  this.moveTo(this.data.x, this.data.y);
}
Ghost.prototype._initEvent = function() {
  var $el = this.$el, self = this, options = this.options;
  $el.on('click', function(e) {
    if($(e.target).hasClass('ghost_del')) { //删除
      options.onDelete && options.onDelete(self.id);
    }else {
      options.onClick && options.onClick(self.data);
    }
  })
}
Ghost.prototype._createTemplate = function() {
  var template = '<div class="ghost_item" data-type=' + this.data.type + '>' + this.data.text +'<span class="ghost_del">x</span></div>';
  this.$el = $(template);
}
Ghost.prototype.moveTo = function(x, y) {
  this.data.x = x;
  this.data.y = y;
  this.$el.css({
    'top': y + 'px',
    'left': x + 'px'
  })
}