import { StyleSheet } from 'react-native';

export const titleStyles = StyleSheet.create({
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
  h3: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h5: { fontSize: 18, fontWeight: '500', lineHeight: 24 },
  h6: { fontSize: 16, fontWeight: '500', lineHeight: 22 },
  h7: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  underline: { textDecorationLine: 'underline' },
  italic: { fontStyle: 'italic' },
  primary: { color: '#1976d2' },
  danger: { color: '#d32f2f' },
  center: { textAlign: 'center' },
});
