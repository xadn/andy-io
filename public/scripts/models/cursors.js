(function($){

	var Cursor = Backbone.Model.extend({
		defaults: {
			x: 0,
			y: 0
		},
		setLeft: function(left) {
			this.set({x: left / $(window).height()});
		},
		setTop: function(top) {
			this.set({y: top / $(window).width()});
		},
		getLeft: function() {
			return this.get('x') * $(window).height();
		},
		getTop: function() {
			return this.get('y') * $(window).width();
		}
	});

	var LocalCursor = Cursor.extend({
		initialize: function() {
			_.bindAll(this, 'onMouseEvent');
			$(document).bind('mousemove', this.onMouseEvent)
			this.set({OS: this.getOS()});
		},
		getOS: function() {
			return ~navigator.appVersion.indexOf('Mac') ? 'Mac' : 'Windows'
		},
		onMouseEvent: function(mouseEvent) {
			this.setLeft(mouseEvent.pageX);
			this.setTop(mouseEvent.pageY);
			this.save();
		},
		sync: function(method, model, options) {
			switch (method) {
				case 'create':
					this.set({id : 1});
					window.socket.emit('createCursor', model);
				case 'update':
					window.socket.emit('updateCursor', model);
			}
		}
	});

	var RemoteCursor = Cursor.extend({});

	var RemoteCursorView = Backbone.View.extend({
		tagName: 'img',
		OSToIcon: {
			'Mac' : '/images/macCursor.png',
			'Windows' : '/images/winCursor.png'
		},
		initialize: function() {
			_.bindAll(this, 'render', 'unrender');
			this.model.bind('change', this.render);
			$(this.el).attr('src', this.OSToIcon[this.model.get('OS')]);
		},
		render: function() {
			$(this.el).offset({
				left: this.model.getLeft(),
				top: this.model.getTop()
			});
			return this;
		},
		unrender: function() {
			$(this.el).fadeOut('slow');
			// $(this.el).remove();
		}
	});

	var RemoteCursorCollection = Backbone.Collection.extend({
		model: RemoteCursor
	});

	var RemoteCursorCollectionView = Backbone.View.extend({
		el: $('body'),
		initialize: function(){
			_.bindAll(this, 'onUpdateCursor', 'onDeleteCursor', 'appendCursor');
			this.collection = new RemoteCursorCollection();
			this.collection.bind('add', this.appendCursor);
			window.socket.on('updateCursor', this.onUpdateCursor);
			window.socket.on('deleteCursor', this.onDeleteCursor);
		},
		onUpdateCursor: function(remoteCursor) {
			var cursor = this.collection.get(remoteCursor.id)
			if (!cursor) {
				this.collection.add(remoteCursor);
			} else {
				cursor.set({
					x: remoteCursor.x,
					y: remoteCursor.y
				});
			}
		},
		onDeleteCursor: function(remoteCursor) {
			var cursor = this.collection.get(remoteCursor.id);
			cursor.el.fadeOut('slow');
			this.collection.remove(cursor);
		},
		appendCursor: function(remoteCursor) {
			var remoteCursorView = new RemoteCursorView({
				model: remoteCursor
			});
			$(this.el).append(remoteCursorView.render().el);
		}
	});

	new LocalCursor();
	new RemoteCursorCollectionView();

})(jQuery);