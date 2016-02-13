/**
 * Copyright (c) 2015-present, Venture Applications, LLC.
 * All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Harrison Miller <hmaxmiller@gmail.com>, September 2015
 *
 * @providesModule HomePageIcon
 * @flow
 */

'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = 30;

type Props = {
    color: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    style: View.propTypes.style
};

class HomePageIcon extends Component {
    constructor(props:Props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.3}
                onPress={this.props.onPress}
                style={[this.props.style, {width: (this.props.size || SIZE) * 3.48, height: (this.props.size || SIZE) * 3.48, alignItems: 'flex-start'}]}>
                <Icon
                    name="ios-home-outline"
                    size={this.props.size || SIZE}
                    color={this.props.color || '#ccc'}
                    iconStyle={[styles.icon]}
                    />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        opacity: 1.0
    }
});

module.exports = HomePageIcon;