var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var BaseLink = function (_Component) {
    _inherits(BaseLink, _Component);

    function BaseLink(props, context) {
        _classCallCheck(this, BaseLink);

        var _this = _possibleConstructorReturn(this, (BaseLink.__proto__ || Object.getPrototypeOf(BaseLink)).call(this, props, context));

        _this.router = context.router;

        if (!_this.router.hasPlugin('BROWSER_PLUGIN')) {
            console.error('[react-router5][BaseLink] missing browser plugin, href might be build incorrectly');
        };

        _this.isActive = _this.isActive.bind(_this);
        _this.clickHandler = _this.clickHandler.bind(_this);

        _this.state = { active: _this.isActive() };
        return _this;
    }

    _createClass(BaseLink, [{
        key: 'buildUrl',
        value: function buildUrl(routeName, routeParams) {
            if (this.router.buildUrl) {
                return this.router.buildUrl(routeName, routeParams);
            }

            return this.router.buildPath(routeName, routeParams);
        }
    }, {
        key: 'isActive',
        value: function isActive() {
            return this.router.isActive(this.props.routeName, this.props.routeParams, this.props.activeStrict);
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler(evt) {
            if (this.props.onClick) {
                this.props.onClick(evt);

                if (evt.defaultPrevented) {
                    return;
                }
            }

            var comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

            if (evt.button === 0 && !comboKey) {
                evt.preventDefault();
                this.router.navigate(this.props.routeName, this.props.routeParams, this.props.routeOptions);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                routeName = _props.routeName,
                routeParams = _props.routeParams,
                className = _props.className,
                activeClassName = _props.activeClassName,
                children = _props.children,
                title = _props.title,
                onMouseOver = _props.onMouseOver;


            var active = this.isActive();
            var href = this.buildUrl(routeName, routeParams);
            var linkclassName = (className ? className.split(' ') : []).concat(active ? [activeClassName] : []).join(' ');

            return React.createElement('a', {
                href: href,
                className: linkclassName,
                onClick: this.clickHandler,
                onMouseOver: onMouseOver,
                title: title
            }, children);
        }
    }]);

    return BaseLink;
}(Component);

BaseLink.contextTypes = {
    router: PropTypes.object.isRequired
};

BaseLink.propTypes = {
    routeName: PropTypes.string.isRequired,
    routeParams: PropTypes.object,
    routeOptions: PropTypes.object,
    activeClassName: PropTypes.string,
    activeStrict: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func
};

BaseLink.defaultProps = {
    activeClassName: 'active',
    activeStrict: false,
    routeParams: {},
    routeOptions: {}
};

export default BaseLink;