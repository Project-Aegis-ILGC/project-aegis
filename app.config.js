module.exports = {
    name: 'Project-Aegis',
    version: '1.0.0',
    scheme: "acme",
    web: {
      "bundler": "metro"
    },
    android: {
      permissions: [
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_BACKGROUND_LOCATION"
      ],
    package: "com.jalansubham7.ProjectAegis"
    },
    plugins: [
      "expo-router"
    ],
    name: "Project-Aegis",
    slug: "Project-Aegis",
    extra: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      eas: {
        projectId: "209b8b07-890b-4d15-82cd-ef3951d0e91a"
      },
      router: {
        "origin": false
      },
      
    },
  };