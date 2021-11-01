/** *******************************************************************************************************************
Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                                                                              *
 ******************************************************************************************************************** */
import { FunctionComponent, useMemo } from 'react';
import Stack from 'aws-northstar/layouts/Stack';
import Box from 'aws-northstar/layouts/Box';
import Button from 'aws-northstar/components/Button';
import HeadingStripe from 'aws-northstar/components/HeadingStripe';
import FormRenderer, { componentTypes, validatorTypes } from 'aws-northstar/components/FormRenderer';
import { DataType } from 'data-type';
import Alert from 'aws-northstar/components/Alert';

export interface AbaloneInsightResultProps {
    data?: DataType;
    feedbackSubmited?: boolean;
    onSubmit: (data: any) => void;
    onNewClick: () => void;
}

const getSchema = () => {
    return {
        header: 'What is the actual value?',
        description: 'Help us improve the prediction',
        canCancel: false,
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'actual',
                label: 'Actual value',
                type: 'number',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
        ],
    };
};

const AbaloneInsightResult: FunctionComponent<AbaloneInsightResultProps> = ({
    data,
    onSubmit,
    onNewClick,
    feedbackSubmited,
}) => {
    const schema = useMemo(() => getSchema(), []);
    const actionButton = useMemo(
        () => (
            <Button variant="primary" onClick={onNewClick}>
                New Prediction
            </Button>
        ),
        [onNewClick]
    );
    return (
        <Stack>
            <HeadingStripe
                actionButtons={actionButton}
                title={`The predicted age for the input Abalone is ${data?.predict}`}
            />
            {!feedbackSubmited && (
                <Box borderColor="primary.main" border={1} m={1} p={1}>
                    <FormRenderer schema={schema} onSubmit={(data) => onSubmit(data as DataType)} />
                </Box>
            )}
            {feedbackSubmited && <Alert>Your feedback has been recorded.</Alert>}
        </Stack>
    );
};

export default AbaloneInsightResult;
