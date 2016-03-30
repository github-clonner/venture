/**
 * Copyright (c) 2015-present, Venture Applications, LLC.
 * All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Harrison Miller <hmaxmiller@gmail.com>, September 2015
 *
 * @providesModule ChatsListPageIcon
 * @flow
 */

'use strict';

import React, {
  Component,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Animatable from 'react-native-animatable';
import {Icon, } from 'react-native-icons';

const SIZE = 34;

type Props = {
  chatCount: React.PropTypes.number,
  color: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.number,
  style: View.propTypes.style
};

class ChatsListPageIcon extends Component {
  constructor(props:Props) {
    super(props);
    this.state = {
      animationDidFinish: false
    };
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({animationDidFinish: true})
    }, 1500);
    this.refs.chatsListPageIcon && this.refs.chatsListPageIcon.fadeInDown(900); // do second after set timeout
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  };

  render() {
    let badge = (
      <View ref="badge" style={{flex: 1, top: 8, left: 6}}>
        <Text
          style={styles.badge}>{this.props.chatCount}</Text>
      </View>
    );

    return (
      <TouchableOpacity activeOpacity={0.3} onPress={this.props.onPress}>
        {this.props.chatCount > 0 && this.state.animationDidFinish ? badge : undefined}
        <Animatable.View ref="chatsListPageIcon">
          <TouchableOpacity
            onPress={this.props.onPress}
            style={[this.props.style, {width: (this.props.size || SIZE) * 2.48,
                      height: (this.props.size || SIZE) * 2.48, justifyContent: 'center', alignItems: 'flex-end'}]}>
            <Icon
              name="ion|ios-chatboxes"
              size={this.props.size || SIZE}
              color={this.props.color || '#ccc'}
              style={[styles.icon]}
              />
          </TouchableOpacity>
        </Animatable.View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  badge: {
    width: SIZE / 1.6,
    height: SIZE / 1.6,
    fontSize: SIZE / 2.4,
    borderRadius: SIZE / 3.2,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'AvenirNextCondensed-Medium',
    left: SIZE*2,
    bottom: SIZE / 8,
    paddingTop: 1,
    backgroundColor: '#FF0017',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    opacity: 0.8
  },
  icon: {
    opacity: 0.6,
    width: SIZE,
    height: SIZE
  }
});

module.exports = ChatsListPageIcon;