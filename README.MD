# LurkReveal&trade;

# DEPRECATION NOTICE
## Due to Twitch's changes to the undocumented /tmi endpoints on April 4th 2023, this website no longer works.

## Summary

LurkReveal&trade; is a tool that you can open as a website to get a visual representation of what users are in your Twitch chat.

## Usage

- Go to https://matthewbrandt.github.io/lurkreveal
- Input your broadcaster username in the input field
- Enjoy!

## Categories & Colours
Each category has it's own colour, appropriately using the colours from the Twitch UI. If there are no chatters in that category in your stream, the entire category is hidden (e.g. "Staff").

### Known Bots
Bots are classified as such by multiple different websites in different ways. In general, it can be said that bots connect to multiple (10+) different chats via IRC directly and are therefore not watching your stream. There are currently `204'307` bots in the list here! If a bot is known for providing a particular service, see below. *FYI: The recent (2022-09-25) bot account influx on Twitch of nearly 4M accounts is not accounted for here.*

### Digital Service
Some bots are connected to your chat because they provide a service like stream analyticy, or you even may have invited them there. If you have a bot that is misclassified, please reach out!

## More Information

The word `lurker` is commonly used within the Twitch community to loosely describe users that are hanging out in your channel, but are not speaking in chat.

There are _many_ reasons why a user may be in your stream and not chatting e.g.

- is away from keyboard (AFK)
- is on a phonecall and cannot write
- was part of a raid into your channel and is seeing a pre-roll ad
- doesn't feel confident in writing in your stream's language(s)
- ...is happy to just watch your stream!

The streamer must accept that _all_ of these reasons are legitimate reasons! It's not for the streamer to judge users for the way a user chooses to participate in the stream. People are free to consume your content as they choose.

## Purpose

This is **not** a tool that is used for spying on Twitch users in your chat and calling them out for lurking. Twitch is fundamentally an open, caring community and appreciates that each person is unique in their own way.

LurkReveal&trade; tool is for streamers to see what users are in their chat for different reasons:

- keep an eye out for other streamers who may be friends, potential incoming raids, etc.
- monitor against potential hate raids or other hate events
- understand overall chat engagement compared to all users in chat
- easily identify bot accounts (and deal with them as desired)
- etc.

## Additional Features

Besides just the visual representation of the chat categories, these other features have been added.

### Custom User List
You are able to have a list of users that are highlighted especially. The list is stored locally in your browser and is saved until you delete it yourself, but never transmitted over the internet or captured in any way. Useful for seeing if your stream teammates are in your own stream while you're live, or are in a stream you're watching! It's also a way for you to check streams before opening them on Twitch for people you may not get along with and wish to avoid 😉

## Planned Features (TBD)

Please give feedback on the below ideas to consider if they are worth implementing! Check the list of issues here in Github and leave a comment on them or just join my stream and give me feedback live!

### Modpulse
When you have more than 1 mod (who is not classified as a Digital Service) and they disconnect from chat, the background will pulse 3 times to visually alert you that your mod(s) have disconnected from chat. 

### Custom Styling
The ability to choose or set custom styling for the page, such as a lightmode option or overriding all styles with your own.
