# 🔥 Firebase Configuration Guide for Blog Discussion Forum

To complete the setup of your Blog Discussion Forum, follow these 2 simple steps in your Firebase Console for project `blog-portfolio-1`:

---

## Step 1: Set Up Firestore Security Rules (With Admin Privileges for ashu@gmail.com)

1. Open [Firebase Console](https://console.firebase.google.com/) and select your project: **`blog-portfolio-1`**.
2. In the left sidebar, click **Firestore Database**.
3. Click on the **Rules** tab at the top.
4. Replace the existing content with the following rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if the authenticated user is the Admin
    function isAdmin() {
      return request.auth != null && request.auth.token.email.lower() == 'ashu@gmail.com';
    }
    
    // Blog Discussion Forum & Threaded Replies
    match /blog_discussions/{commentId} {
      // 1. Anyone (public or logged-in) can read comments and replies
      allow read: if true;

      // 2. Only authenticated users can post questions or replies
      allow create: if request.auth != null
        && request.resource.data.author.uid == request.auth.uid
        && request.resource.data.postSlug is string
        && request.resource.data.content is string
        && request.resource.data.content.size() > 0
        && request.resource.data.content.size() <= 3000;

      // 3. Authors can delete their own comments/replies, AND Admin (ashu@gmail.com) can delete ANY comment/reply
      allow delete: if request.auth != null
        && (resource.data.author.uid == request.auth.uid || isAdmin());

      // 4. Authenticated users can toggle likes, and Admin has full moderation rights
      allow update: if request.auth != null
        && (
          request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
          || resource.data.author.uid == request.auth.uid
          || isAdmin()
        );
    }

  }
}
```

5. Click **Publish**.

---

## Step 2: Enable Authentication Providers

In [Firebase Console](https://console.firebase.google.com/) > **Authentication** > **Sign-in method** tab:

### 1. Enable Google:
1. Click on **Google** under Sign-in providers.
2. Toggle **Enable**.
3. Set the **Project support email** (e.g. `ashu@gmail.com`).
4. Click **Save**.

### 2. Enable Email/Password:
1. Click on **Email/Password** under Sign-in providers.
2. Toggle **Enable** for the first option ("Email/Password").
3. Click **Save**.

---

## Roles & Permissions:
- 👑 **Admin (`ashu@gmail.com`)**:
  - Can delete **any** message or reply across the entire forum.
  - Receives a special golden/primary **Admin** badge on their profile and comments.
- 👤 **Regular Users**:
  - Can post questions and start discussions.
  - Can reply to any message or thread.
  - Can delete **only their own** messages and replies.
  - Can like / unlike messages.
