import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';

function EditBox({ value, ...props }) {
    const [canEdit, setEditMode] = useState(false);
    const [text, setText] = useState(value);
    const inputRef = useRef(null);

    function turnOnEdit() {
        setEditMode(true);
        inputRef.current.focus();
    }

    const mystyle = StyleSheet.create({
        button: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
        wrapper: {
            width: 200,
            padding: 10,
        },
        input: {
            borderColor: 'gray',
            borderWidth: 1,
            padding: 5,
        },
    });

    return (
        <View style={mystyle.wrapper}>
            <TextInput
                style={mystyle.input}
                value={value}
                editable={canEdit}
                ref={inputRef}
                onChangeText={(newText) => setText(newText)}
                onBlur={() => setEditMode(false)}
            />
            {!canEdit && (
                <Button
                    style={mystyle.button}
                    title="Edit"
                    onPress={turnOnEdit}
                />
            )}
        </View>
    );
}

EditBox.propTypes = {
    value: PropTypes.string,
};

export default EditBox;