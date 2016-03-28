/**
 * Copyright (c) 2015-present, Venture Applications, LLC.
 * All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Harrison Miller <hmaxmiller@gmail.com>, September 2015
 *
 * @providesModule ChevronIcon
 * @flow
 */

'use strict';

import React, {
  Component,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Animatable from 'react-native-animatable';
import {Icon, } from 'react-native-icons';

const DIRECTIONS = ['up', 'down', 'right', 'left'], SIZE = 25;

type Props = {
  animate: React.PropTypes.bool,
  color: React.PropTypes.string,
  direction: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  size: React.PropTypes.number,
  style: View.propTypes.style
};

class ChevronIcon extends Component {
  constructor(props:Props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.animated) this._animate();
    });
  };

  _animate() {
    this.refs.chevronIcon.flash(3000).then(() => {
      this.refs.chevronIcon.flash(3000).then(() => {
        this.refs.chevronIcon.flash(3000);
      })
    })
  };

  render() {
    return (
      <Animatable.View ref="chevronIcon" style={[this.props.style, {width: (this.props.size || SIZE) * 1.18,
                height: (this.props.size || SIZE) * 1.18, alignItems: 'center'}]}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={this.props.onPress}>
        <Icon
          name={"ion|ios-arrow-" + (DIRECTIONS.indexOf(this.props.direction) > -1 ?
                    this.props.direction : 'up')}
          size={this.props.size || SIZE}
          color={this.props.color || '#ccc'}
          style={[styles.icon]}
          />
      </TouchableOpacity>
      </Animatable.View>
    );
  };
}

const styles = StyleSheet.create({
  icon: {
    width: SIZE,
    height: SIZE
  }
});

module.exports = ChevronIcon;