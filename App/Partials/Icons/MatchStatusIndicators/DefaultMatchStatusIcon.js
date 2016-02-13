/**
 * Copyright (c) 2015-present, Venture Applications, LLC.
 * All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Harrison Miller <hmaxmiller@gmail.com>, September 2015
 *
 * @providesModule DefaultMatchStatusIcon
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

import Icon from 'react-native-vector-icons/Entypo';

const SIZE = 25;

type Props = {
    color: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    style: View.propTypes.style
};

class DefaultMatchStatusIcon extends Component {
    constructor(props:Props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.3}
                onPress={this.props.onPress}
                style={[this.props.style]}>
                <Icon
                    name="chevron-thin-right"
                    size={this.props.size || SIZE}
                    color={this.props.color || 'rgba(0,0,0,0.2)'}
                    iconStyle={[{width: (this.props.size || SIZE) * 1.18, height: (this.props.size || SIZE) * 1.18}, styles.icon]}
                    />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'transparent'
    }
});

module.exports = DefaultMatchStatusIcon;