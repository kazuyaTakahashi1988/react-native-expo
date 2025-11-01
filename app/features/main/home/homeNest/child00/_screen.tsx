import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { Layout } from '../../../../../components/layout';

import type { TypeChild00Screen } from './_type';

type FormValues = {
  email: string;
  name: string;
};

const Child00Screen: React.FC<TypeChild00Screen> = (_props) => {
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setSubmittedValues(values);
  };

  const onReset = () => {
    reset();
    setSubmittedValues(null);
  };

  return (
    <View style={styles.container}>
      <Layout>
        <Text style={styles.title}>react-hook-form minimal example</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            name='name'
            rules={{ required: 'Name is required.' }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                autoCapitalize='words'
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='Jane Doe'
                style={[styles.input, errors.name ? styles.inputError : null]}
                value={value}
              />
            )}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name.message}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name='email'
            rules={{
              pattern: {
                message: 'Please enter a valid email.',
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
              required: 'Email is required.',
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                autoCapitalize='none'
                keyboardType='email-address'
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='jane@example.com'
                style={[styles.input, errors.email ? styles.inputError : null]}
                value={value}
              />
            )}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email.message}</Text> : null}
        </View>

        <View style={styles.actions}>
          <Button onPress={handleSubmit(onSubmit)} title={isSubmitting ? 'Submitting…' : 'Submit'} />
          <Button color='#444' onPress={onReset} title='Reset' />
        </View>

        {submittedValues ? (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Submitted values</Text>
            <Text>Name: {submittedValues.name}</Text>
            <Text>Email: {submittedValues.email}</Text>
          </View>
        ) : null}
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#e53935',
  },
  errorText: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  result: {
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 24,
    padding: 16,
    rowGap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Child00Screen;
