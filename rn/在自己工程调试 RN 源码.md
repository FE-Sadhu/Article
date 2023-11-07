### 1. 修改 node_modules 下 RN 目录
去 github 仓库同步特定版本根目录下缺失的文件。 以 0.67.8 版本为例，缺失了如下文件，补充上：

#### settings.gradle.kts
```
/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

pluginManagement {
    repositories {
        mavenCentral()
        google()
        gradlePluginPortal()
    }
}

include(
    ":ReactAndroid",
    ":packages:react-native-codegen:android",
    ":packages:rn-tester:android:app"
)

// Include this to enable codegen Gradle plugin.
includeBuild("../react-native-gradle-plugin/")
```

#### build.gradle.kts
```
/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

val ndkPath by extra(System.getenv("ANDROID_NDK"))
val ndkVersion by extra(System.getenv("ANDROID_NDK_VERSION"))

buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        val kotlin_version: String by project
        classpath("com.android.tools.build:gradle:7.0.4")
        classpath("de.undercouch:gradle-download-task:4.1.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version")
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        maven {
            url = uri("$rootDir/node_modules/jsc-android/dist")
        }
        google()
        mavenCentral {
            // We don't want to fetch react-native from Maven Central as there are
            // older versions over there.
            content {
                excludeGroup("com.facebook.react")
            }
        }
    }
}

tasks.register("cleanAll", Delete::class.java) {
    description = "Remove all the build files and intermediate build outputs"
    dependsOn(gradle.includedBuild("react-native-gradle-plugin").task(":clean"))
    delete(allprojects.map { it.buildDir })
    delete(rootProject.file("./ReactAndroid/.cxx"))
    delete(rootProject.file("./ReactAndroid/src/main/jni/prebuilt/lib/arm64-v8a/"))
    delete(rootProject.file("./ReactAndroid/src/main/jni/prebuilt/lib/armeabi-v7a/"))
    delete(rootProject.file("./ReactAndroid/src/main/jni/prebuilt/lib/x86/"))
    delete(rootProject.file("./ReactAndroid/src/main/jni/prebuilt/lib/x86_64/"))
    delete(rootProject.file("./packages/react-native-codegen/lib"))
    delete(rootProject.file("./packages/rn-tester/android/app/.cxx"))
}
```

#### gradle.properties
```
# This is causing issue with dependencies task: https://github.com/gradle/gradle/issues/9645#issuecomment-530746758
# org.gradle.configureondemand=true
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g -Dfile.encoding=UTF-8
org.gradle.parallel=true

android.useAndroidX=true
kotlin_version=1.6.10

# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

### 2. 修改自己工程 android/settings.gradle 
在自己工程 android/settings.gradle 中增加如下配置，可根据官方贡献指南可选配置。

```
includeBuild('../node_modules/react-native') {
    dependencySubstitution {
        // substitute(module("com.facebook.react:react-android")).using(project(":packages:react-native:ReactAndroid"))
        substitute(module("com.facebook.react:react-native")).using(project(":ReactAndroid"))
        // substitute(module("com.facebook.react:hermes-android")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
        // substitute(module("com.facebook.react:hermes-engine")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
    }
}
```

然后用 AS 重新构建项目就行，可直接在 node_modules RN 源码里打日志、debug 了。