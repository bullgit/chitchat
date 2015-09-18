# chitchat

Building a bullgit chat from scratch

# Install

- install ruby 2.1.2 or newer
- `bundle install`

# Starting the server

`GITHUB_KEY=<the_github_key> GITHUB_SECRET=<the_github_secret> bundle exec rackup`

# Features:

## Main

- [ ] push notifications
- [x] useable on mobile
  - [x] viewport meta tag
- [ ] one-time sign in
- [x] enter to send
- [x] open source
- [x] markdown
- [ ] mentions
- [ ] channels
- [ ] see who's online
- [ ] fast
  - [ ] sending 10 gifs in a row will result in less history, not in slow and unuseable interfaces

## less needed

- [ ] edit after send
- [ ] emoji's
  - [ ] custom bullgit emojis
- [ ] embed.ly and ogp/twitter
- [ ] code highlighting
  - [ ] "code" mode where enter sends a soft enter between code fences (```)

## other basic things

- [x] clear after send
  - [ ] no weird enter after entering to send

## layouts to look at

- iMessage
- Messenger (fb or the android SMS app)
- slack
