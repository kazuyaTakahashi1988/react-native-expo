import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CheckBoxCustom, Input } from '../../../../../components/form';
import { Layout } from '../../../../../components/layouts/layout';
import { color } from '../../../../../lib/mixin';
import {
  exampleFlagSet,
  exampleStringSet,
  store,
} from '../../../../../services/storeService';

import type { TypeSelectorState } from '../../../../../lib/types/typeService';
import type React from 'react';

/* -----------------------------------------------
 * About > Child02 画面
 * ----------------------------------------------- */

const Child02Screen: React.FC = () => {
  // ストアの値を取得
  const currentExampleString = useSelector(
    (state: TypeSelectorState) => state.exampleString,
  );
  const currentExampleFlag = useSelector(
    (state: TypeSelectorState) => state.exampleFlag,
  );

  return (
    <Layout>
      <Text style={styles.title}>redux-toolkit{`\n`}Example</Text>

      {/* --------------------------------------
       * ストア - exampleString のテスト
       * --------------------------------------- */}
      <View style={[styles.clm, styles.mt24]}>
        <Text style={styles.clmTitle}>ストア - exampleString の更新</Text>

        {/* インプット項目 */}
        <Input
          containerStyle={styles.mt24}
          onChange={(e) => {
            // ストアの値を更新
            store.dispatch(exampleStringSet(e.nativeEvent.text));
          }}
          placeholder='入力をお願いします。'
        />

        <Text style={styles.mt24}>
          <Text style={styles.bold}>値を表示：</Text>[{currentExampleString}]
        </Text>
      </View>

      {/* --------------------------------------
       * ストア - exampleFlag のテスト
       * --------------------------------------- */}
      <View style={[styles.clm, styles.mt24]}>
        <Text style={styles.clmTitle}>ストア - exampleFlag の更新</Text>

        {/* チェックボックスカスタム項目 */}
        <CheckBoxCustom
          containerStyle={styles.mt24}
          onToggle={(e) => {
            // ストアの値を更新
            const flag = Object.keys(e).length > 0;
            store.dispatch(exampleFlagSet(flag));
          }}
          options={[{ label: '', value: '' }]}
        />

        <Text style={styles.mt24}>
          <Text style={styles.bold}>値を表示：</Text>[
          {!currentExampleFlag ? 'false' : 'true'}]
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  mt24: {
    marginTop: 24,
  },
  clm: {
    backgroundColor: color.white,
    borderColor: color.gray100,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 24,
    padding: 20,
  },
  clmTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '600',
  },
});

export default Child02Screen;
