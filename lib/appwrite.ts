/**
 * react-native-appwrite: 这是撒旦Appwrite 的React Native SDK,
 * 提供了与 Appwrite 服务交互的各种类和方法.
 * Account 用于处理用户账户相关操作, Avatars 用于生成用户头像
 * Client 是与 Appwrite 服务器通信的客户端,
 * OAuthProvider 包含了支持的 OAuth 提供商列表
 */
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
/**
 * expo-linking: Expo 提供的链接处理库,用于创建和解析应用内的链接
 */
import * as Linking from "expo-linking";
/**
 * expo-web-browser: Expo 提供的用于浏览器中打开 URL 的库,
 * openAuthSessionAsync 方法用于在浏览器中打开 OAuth 认证页面
 */
import { openAuthSessionAsync } from "expo-web-browser";

/** Appwrite 的配置信息 */
export const config = {
  // 平台标识
  platform: "com.ccc.restate",
  // 服务器端点
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  // 项目ID
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

/**
 * 设置客户端的配置信息,以便与 Appwrite 服务器进行通信
 */
export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

/** 用于生成用户头像 */
export const avatar = new Avatars(client);
/** 用于处理用户账户相关操作,如登录,注销,获取用户信息等 */
export const account = new Account(client);

/** Google Sign in */
export async function login() {
  try {
    // 创建重定向URI, 用于在 OAuth 认证完成后将用户重定向回应用
    const redirectUri = Linking.createURL("/");

    // 获取 Google OAuth 认证的 URI
    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to login");

    // 使用 openAuthSessionAsync 方法在浏览器中打开认证 URL,等待用户完成认证
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") throw new Error("Failed to login");

    // 从返回的 URL 中提取 secret 和 userId
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Failed to login");

    // 创建新的账户会话
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to  create a session");
    // 登录成功
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/** 注销功能 */
export async function logout() {
  try {
    // 删除当前用户的会话
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/** 获取用户 */
export async function getUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      // 生成用户的首字母头像
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 00:59:53