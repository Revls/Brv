(function() {
var get = Ember.get, set = Ember.set;

Ember.ListItemView = Ember.View.extend({
  classNames: ['list-item-view'],

  // Attribute bindings are too slow
  _updateStyle: function() {
    var e = get(this, 'element');
    if (e) { // WHY?
      e.style.top = get(this, 'top') + 'px';
    }
  },

  didInsertElement: function() {
    this._updateStyle();
  },

  serialize: function() {},
  prepareForReuse: function() {}
});

})();



(function() {
var get = Ember.get, set = Ember.set;

Ember.ListView = Ember.ContainerView.extend({
  classNames: ['list-view'],
  attributeBindings: ['style'],
  scrollTop: 0,
  itemViewClass: Ember.ListItemView,

  init: function() {
    this.contentDidChange(); // Setup array observing
    this._super();
    this._renderList();
  },

  style: Ember.computed(function() {
    return "height: " + get(this, 'height') + "px";
  }).property('height'),

  didInsertElement: function() {
    // FIXME: Don't need to render the list inside didInsertElement unless
    // we're going to support the ListView inheriting it's height from a
    // containing element.
    // this._renderList();

    this.$().on('scroll', Ember.$.proxy(this.scroll, this));
  },

  willDestroyElement: function() {
    this.$().off('scroll', Ember.$.proxy(this.scroll, this));
  },

  // Browser fires the scroll event asynchronously
  scroll: function(e) {
    Ember.run(this, this.scrollTo, e.target.scrollTop);
  },

  _renderList: function() {
    this._createChildViews();
    this._appendScrollingView();
  },

  _rerenderList: function() {
    this.destroyAllChildren();
    this._renderList();
  },

  _createScrollingView: function() {
    return Ember.View.createWithMixins({
      attributeBindings: ['style'],

      style: Ember.computed(function() {
        return "height: " + get(this, 'parentView.totalHeight') + "px";
      }).property('parentView.totalHeight')
    });
  },

  _appendScrollingView: function() {
    this.pushObject(this._createScrollingView());
  },

  totalHeight: Ember.computed(function() {
    return get(this, 'content.length') * get(this, 'rowHeight');
  }).property('content.length', 'rowHeight'),

  scrollTo: function(scrollTop) {
    set(this, 'scrollTop', scrollTop);

    var itemViewClass = get(this, 'itemViewClass'),
        contentLength = get(this, 'content.length'),
        childViews = this,
        childViewsLength = get(this, 'length') - 1, // account for scrollingView
        startingIndex = this._startingIndex(),
        endingIndex = startingIndex + this._numOfChildViewsForHeight(),
        childView, attrs;

    for (var contentIndex = startingIndex; contentIndex < endingIndex; contentIndex++) {
      childView = childViews.objectAt(contentIndex % childViewsLength);
      this._prepareChildForReuse(childView);
      this._reuseChildForContentIndex(childView, contentIndex);
    }
  },

  _prepareChildForReuse: function(childView) {
      this._serializeChildState(childView);
      childView.prepareForReuse();
  },

  _reuseChildForContentIndex: function(childView, contentIndex) {
    var content = get(this, 'content');

    set(childView, 'context', content.objectAt(contentIndex));
    set(childView, 'contentIndex', contentIndex);
    set(childView, 'top', get(this, 'rowHeight') * contentIndex);

    childView.setProperties(this._propertiesForContentIndex(contentIndex));
  },

  _serializeChildState: function(childView) {
    var contentIndex = childView.get('contentIndex'),
        properties = childView.serialize();

    this._setPropertiesForContentIndex(contentIndex, properties);
  },

  _propertiesForContentIndex: function(contentIndex) {
    var serializedState = this._serializedState;
    return serializedState && serializedState[contentIndex];
  },

  _setPropertiesForContentIndex: function(contentIndex, properties) {
    var serializedState = this._serializedState = this._serializedState || {};
    serializedState[contentIndex] = properties;
  },

  _createChildViews: function() {
    var itemViewClass = get(this, 'itemViewClass'),
        content = Ember.A(get(this, 'content')),
        contentLength = get(content, 'length'),
        childViews = this,
        startingIndex = this._startingIndex(),
        endingIndex = startingIndex + this._numOfChildViews(),
        childView, attrs;

    for (var contentIndex = startingIndex; contentIndex < endingIndex; contentIndex++) {
      childView = itemViewClass.create();
      this._reuseChildForContentIndex(childView, contentIndex);
      childViews.pushObject(childView);
    }
  },

  _numOfChildViews: function() {
    var contentLength = get(this, 'content.length'),
        numOfChildViewsForHeight = this._numOfChildViewsForHeight();

    if (numOfChildViewsForHeight > contentLength) {
      return contentLength;
    } else {
      return numOfChildViewsForHeight;
    }
  },

  _numOfChildViewsForHeight: function() {
    return get(this, 'height') / get(this, 'rowHeight') + 1; // One row for padding
  },

  _startingIndex: function() {
    var scrollTop = get(this, 'scrollTop'),
        rowHeight = get(this, 'rowHeight');

    return Math.floor(scrollTop / rowHeight);
  },

  contentWillChange: Ember.beforeObserver(function() {
    var content = get(this, 'content');
    if (content) {
      content.removeArrayObserver(this);
    }
  }, 'content'),

  contentDidChange: Ember.observer(function() {
    var content = get(this, 'content');
    if (content) {
      content.addArrayObserver(this);
    }
    if (this.state === 'inDOM') {
      this._rerenderList();
    }
  }, 'content'),

  // TODO: Handle array changes without rerendering the list
  arrayWillChange: Ember.K,
  arrayDidChange: function(content, start, removedCount, addedCount) {
    if (this.state === 'inDOM') {
      this._rerenderList();
    }
  }
});

})();