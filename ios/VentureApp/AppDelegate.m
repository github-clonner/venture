/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppHub.h"
#import "AppDelegate.h"

#import "RCTBridge.h"
#import "RCTJavaScriptLoader.h"
#import "RCTRootView.h"

#import "RCTPushNotificationManager.h"
#import "RNGoogleSignin.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <FBSDKShareKit/FBSDKShareKit.h>

@interface AppDelegate() <RCTBridgeDelegate, UIAlertViewDelegate>

@end

@implementation AppDelegate {
  RCTBridge *_bridge;
}

- (BOOL)application:(__unused UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [AppHub setApplicationID:@"EZ1vdoRGFMd7fbl7fPPt"];
  [AppHub setLogLevel:AHLogLevelDebug];
  
  _bridge = [[RCTBridge alloc] initWithDelegate:self
                                  launchOptions:launchOptions];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge
                                                    moduleName:@"VentureApp"
                                               initialProperties:nil];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  // Register a callback for when a new build becomes available.
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(newBuildDidBecomeAvailable:)
                                               name:AHBuildManagerDidMakeBuildAvailableNotification
                                             object:nil];

  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                    didFinishLaunchingWithOptions:launchOptions];
}

// Facebook App Events
- (void)applicationDidBecomeActive:(UIApplication *)application {
    [FBSDKAppEvents activateApp];
}

// Facebook and Google SDKs
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
    if([[FBSDKApplicationDelegate sharedInstance] application:application
                                                      openURL:url
                                            sourceApplication:sourceApplication
                                                   annotation:annotation])
    {
        return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                     openURL:url
                                                           sourceApplication:sourceApplication
                                                                  annotation:annotation];
    }

    else if([RNGoogleSignin application:application
                                            openURL:url
                                  sourceApplication:sourceApplication
                                         annotation:annotation])
    {
    return [RNGoogleSignin application:application
                               openURL:url
                     sourceApplication:sourceApplication
                            annotation:annotation];
    }
    else
    {
      return YES;
    }
}

// Required to register for notifications
 - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
 {
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
 }
 // Required for the register event.
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
 {
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 }
 // Required for the notification event.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
 {
  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
 }
 // Required for the localNotification event.
 - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
 {
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
 }

#pragma mark - RCTBridgeDelegate

- (NSURL *)sourceURLForBridge:(__unused RCTBridge *)bridge
{
  NSURL *sourceURL;
  
  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */
  
  // sourceURL = [NSURL URLWithString:@"http://192.168.1.2:8081/index.ios.bundle?platform=ios&dev=false"];
  
  /**
   * OPTION 2 - AppHub
   *
   * Load cached code and images from AppHub.
   * To create a build:
   * $ node_modules/.bin/apphub build -o build.zip
   *
   * For additional build configurations:
   * $ node_modules/.bin/apphub build --help
   *
   */

  [AppHub buildManager].cellularDownloadsEnabled = YES;
  AHBuild *build = [[AppHub buildManager] currentBuild];
  sourceURL = [build.bundle URLForResource:@"main"
                             withExtension:@"jsbundle"];

  return sourceURL;
}

- (void)loadSourceForBridge:(RCTBridge *)bridge
                  withBlock:(RCTSourceLoadBlock)loadCallback
{
  [RCTJavaScriptLoader loadBundleAtURL:[self sourceURLForBridge:bridge]
                            onComplete:loadCallback];
}

#pragma mark - NSNotificationCenter

-(void) newBuildDidBecomeAvailable:(NSNotification *)notification {
  // Show an alert view when a new build becomes available. The user can choose to "Update" the app, or "Cancel".
  // If the user presses "Cancel", their app will update when they close the app.
  
  AHBuild *build = notification.userInfo[AHBuildManagerBuildKey];
  NSString *alertMessage = [NSString stringWithFormat:@"There's a new update available.\n\nUpdate description:\n\n %@", build.buildDescription];
  
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Great news!"
                                                  message:alertMessage
                                                 delegate:self
                                        cancelButtonTitle:@"Cancel"
                                        otherButtonTitles:@"Update", nil];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    // Show the alert on the main thread.
    [alert show];
  });
}

#pragma mark - UIAlertViewDelegate

-(void) alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
  if (buttonIndex == 1) {
    // The user pressed "update".
    [_bridge reload];
  }
}

@end
