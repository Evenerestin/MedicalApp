import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#1976d2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  linkButton: {
    paddingVertical: 8,
    alignItems: "center",
  },
  linkText: {
    color: "#1976d2",
    fontSize: 14,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    color: "#1976d2",
    fontWeight: "600",
    marginLeft: 4,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    color: "#999",
    paddingHorizontal: 12,
    fontSize: 12,
  },
  errorText: {
    color: "#e53935",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
});
