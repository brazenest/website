/**
 * The pre-v6 blog archive, transcribed from the final MariaDB dump of the old
 * aldengillespy.com (`backup.sql`, table `articles`, 13 rows — every one visible).
 *
 * Bodies are kept as MARKDOWN here rather than as pre-baked Lexical JSON: markdown stays
 * readable and diffable in review, and the seed converts it with Payload's own
 * `convertMarkdownToLexical` so the stored richText is exactly what the admin editor
 * would have produced. Once seeded, Payload is the authority — re-running the seed will
 * NOT overwrite an edited post unless SEED_POSTS=1 (see src/seed/index.ts).
 *
 * `category` preserves the legacy editorial taxonomy verbatim (engineering / cinematic /
 * process / other), matching the old `categories` table.
 */

export type LegacyPostSeed = {
  legacyId: number
  slug: string
  title: string
  excerpt: string
  category: 'engineering' | 'cinematic' | 'process' | 'other'
  status: 'draft' | 'published'
  publishedAt: string
  readTime: number | null
  bodyMarkdown: string
}

export const postsSeed: LegacyPostSeed[] = [
  {
    legacyId: 1,
    slug: 'variable-fonts-safari-11-support-macos-and-ios-font-wars',
    title: 'Begin using OpenType Variable Fonts! Full support in Safari 11',
    excerpt: 'Resurrected from the era of the Font Wars, the Variable Fonts spec now enjoys full support from Apple devices in Safari 11, and brings irresistible improvements over the predecessors.v',
    category: 'process',
    status: 'published',
    publishedAt: '2017-09-26T00:00:00.000Z',
    readTime: 3,
    bodyMarkdown: `> Type should be part of the body of the computer, and not just the clothing which it wears. --- Matthew Carter

The final release of Safari 11.0 marks the moment when front-end developers should take note of the OpenType 1.8 [Variable Fonts spec](https://medium.com/@tiro/https-medium-com-tiro-introducing-opentype-variable-fonts-12ba6cd2369). As macOS High Sierra shows up beginning today to Apple laptops and desktops, and as iOS 11 continues its proliferation to the world's iPhones and iPads, we will soon see Safari 11.0 represent a majority of web browser traffic --- and with that, full support for variable fonts! (Though non-Safari browsers have not yet enabled support in stable-channel releases, you can test it in [Chrome Canary](https://www.google.com/chrome/browser/canary.html), or after making [adjustments](http://www.axis-praxis.org/blog/2017-04-05/17/how-to-get-variable-fonts-working-in-safari-chrome-and-firefox-macos) in about:config for [Firefox Nightly and Developer Editions](https://www.mozilla.org/firefox/channel/desktop/).)

The variable fonts spec actually isn't a newly-found idea. It originated in Apple's TrueType GX Variations technology, released during [the Font Wars](https://www.pastemagazine.com/articles/2017/01/the-font-wars.html), an epic period of controversy two decades ago that pitted Apple, who pushed for an OS-level font format, against Adobe et.al., who fought to hold the ground gained by their application-level "page description language" tools such as PostScript and their Multiple Masters font spec.

Tom Rickner describes the things in this [post](http://www.monotype.com/blog/articles/part-1-from-truetype-gx-to-variable-fonts/):

> Adobe did not sit idly by during this period. Just 2 months before Apple was able to ship a TrueType enabled System 7, Adobe announced Multiple Masters. With this format, a designer would draw the extreme combinations in each "axis of variation"... and the user could then interpolate intermediate designs within this design space...

... which is a logical approach, but for one key exception:

> As we looked at Multiple Masters, the first thing we all realized was that Adobe was not drawing or storing data for the primary, or the default font in the family. Since **it interpolated from extreme values**, the designer had to draw the shapes that define the outer edges of the design space, as we've previously seen. Mike [Reed] thought **a more useful approach would involve starting with the primary weight**, or another existing weight or style, since these fonts already exist, and in our case they were already instructed in TrueType....

I don't understand why Adobe opted to interpolate the default font. Aren't extremes, by definition, an *exception* to the rule?

Anyway...

> Then Mike considered **the Delta instruction**. One of the unique attributes of the TrueType Delta instruction, is that **it works with arbitrary directionality**. So the instruction doesn't only work in the X direction or the Y direction, but instead can be applied parallel or perpendicular to any two points in a glyph's outline, or on computed angles for that matter.

Brilliant solution. The notion that a font's default configuration should be the standard upon which its variations are built! #uncommonsense

So, fast-forward to today. Apple devices now have support for Variable Fonts, in anticipation of font foundries producing more type definitions that comply with the OpenType 1.8 spec, and as web developers incorporate those new definitions in their approach to page typography and responsive design.

I'll definitely be looking for Variable Fonts support in any typeface I choose from now on. It's enough of a reason to prefer a font over the others, as I can be more certain of the browser's ability to render the most legible text as intended by the glyph designer who I have no doubt knows more about visual subtlety than I do.`,
  },
  {
    legacyId: 2,
    slug: 'what-creates-net-neutrality-market-forces-or-the-fcc',
    title: 'What creates net neutrality — market forces or the FCC?',
    excerpt: 'You know the reasons why net neutrality is a good thing — but do you know how in(significant) the FCC’s rules have been? Do you understand the real threat?',
    category: 'other',
    status: 'published',
    publishedAt: '2017-11-25T00:00:00.000Z',
    readTime: 7,
    bodyMarkdown: `Put down your pitchfork, and listen, and think. Think first.

What actually creates "net neutrality" ?
----------------------------------------

This is a hotly debated topic this week, and will be on the tip of the tech community's tongue at least for a few more weeks. The FCC, under Republican chairman Ajit Pai, is prepared to nix the rules on their books that address what the industry lovingly deems "[net neutrality](https://en.wikipedia.org/wiki/Net_neutrality)" .

We all know the opposition's line: without the FCC's net-neutrality rules, the internet's ISPs will strangle the consumer's internet connection by (for example) putting competitors content on a "slow lane", making a "fast lane" for companies that pay a premium price (higher than the price most internet businesses can afford), unilaterally blocking content the ISPs object to, pushing the ISPs content ahead of everyone else's content, making up schemes to extort more cash from internet subscribers... and so on.

Okay, so let's examine this beyond the surface layer --- because there's always more than one side of an argument.

### What is the current state of things?

The most shocking fact may be that **the internet already has "fast lanes" .**

*Really?* you might be saying now. Yes. Really. And they've been around for a few years. They were constructed during the Obama years. They've been the economic model that funds your binges on Netflix, YouTube, Amazon, and every other major content source you consume high-bandwidth content from. How else do you think those big players guarantee that your videos play almost instantly at any time, anywhere, no matter what so long as you're on a fast connection? *They pay your ISP to prioritize their content. They put your video on a "fast lane"!*

It's basically **[paid prioritization](https://en.wikipedia.org/wiki/Data_discrimination#The_FCC_and_Data_Discrimination).** Yet three years ago, during the Obama years and under a Democratic chairman, the FCC enacted rules that were represented by consumer advocates as the *prohibition* of any ISPs paid prioritization schemes. Those are the FCC's acts that form much of what we call the net-neutrality rules.

*... Huh?* you may be thinking now.

### How is paid prioritization still legal?

Because:

1.  there's a legitimate need for online video distributors (OVDs) like Netflix to guarantee that you receive video data quickly; and
2.  there's more than one way to skin a cat.

From Quartz's [article](https://qz.com/256586/the-inside-story-of-how-netflix-came-to-pay-comcast-for-internet-traffic/) published in 2014 a few months *before* the FCC finalized its net-neutrality rules:

> Netflix... purchased [transit](https://en.wikipedia.org/wiki/Internet_transit) from Cogent, which had a [settlement](https://en.wikipedia.org/wiki/Settlement_(finance))-free [peering](https://en.wikipedia.org/wiki/Peering) arrangement with Comcast. [...] Shortly after Cogent began delivering Netflix traffic requested by Comcast subscribers, Cogent's routes into Comcast's network started to congest. According to Cogent's CEO, "[f]or most of Cogent's history with Comcast...[as] Comcast's subscribers demanded more content from Cogent's customers, Comcast would add capacity to the interconnection points with Cogent to handle that increased traffic." After Cogent began carrying Netflix traffic, however, "**Comcast refused to continue to augment capacity** at our interconnection points as it had done for years prior."
>
> Netflix attempted to address congested routes into Comcast by purchasing all available transit capacity from transit providers that did not pay access fees to Comcast---which involved agreements with Cogent, Level 3, NTT, TeliaSonera, Tata, and X0 Communications. Although all six of those providers sold transit to the entire Internet, only three of them---Cogent, Level 3, and Tata---had direct connections to Comcast's network.
>
> In 2013, congestion on Cogent's and Level 3's routes into Comcast's network steadily increased, reaching a level where it began to affect the performance of Netflix streaming for Comcast's subscribers. [...] When Netflix approached Comcast regarding the lack of uncongested settlement-free routes available to its network, Comcast suggested that Netflix return to using CDNs, which **Comcast could charge access fees that would then be passed on to Netflix**, or use a Tier 1 network like which charged its own access fees. Comcast made clear that **Netflix would have to pay Comcast an access fee** if Netflix wanted to directly connect with Comcast or use third-party CDNs. In essence, Comcast sought to meter Netflix traffic requested by Comcast's broadband subscribers.
>
> Congested interconnection points affected Netflix traffic bound for Comcast subscribers throughout 2013. In December 2013 and January 2014, however, congestion on routes into Comcast's network reached a critical threshold and Comcast's and Netflix's mutual customers were significantly harmed. Comcast subscribers went from viewing Netflix content at 720p on average HD quality) to viewing content at nearly VHS quality. For many subscribers, the bitrate was so poor that Netflix's streaming video service became unusable.
>
> The degraded viewing quality for Comcast subscribers also resulted in a sharp increase in calls to Netflix customer support. Those calls made clear that Comcast was well aware of the degradation of Netflix traffic and was directing its subscribers to contact Netflix.

During the peak streaming season --- December and January --- the viewing experience for Netflix customers on Comcast connections was so bad, Netflix was flooded with customer service complaints. They had to act. As Comcast is not required to increase capacity for any reason except their own, Netflix was compelled to forge a tighter relationship with the internet's infrastructure owners that collectively serve Comcast's subscribers. That list of players obviously includes Comcast.

Then, as if by magic...

> Faced with such severe degradation of its streaming video service, **Netflix began to negotiate for paid access to connect with Comcast.** Netflix and Comcast eventually reached a paid agreement. Within a week of that agreement, viewing quality for Netflix streaming video on Comcast's network shot back up to HD-quality levels.

![](https://web.archive.org/web/20210415225457im_/https://aldengillespy.com/wp-content/uploads/2017/11/netflix-comcast-net-neutrality-2014.png)

Netflix's agreement with Comcast gave their customers the best experience they'd offered to-date.

The lesson here is that, **as well-intentioned the FCC may be in its push for total net-neutrality, it does not have that degree of authority** by the Constitution nor by Congress.

### The network providers --- the market forces --- not the FCC --- determine "net neutrality"

Because its power is fundamentally insufficient, their actions amount to little more than saber-rattling and public statements to influence public opinion (and, possibly, market's response). The public thinks the FCC has a dog in this fight, but they really don't, because they technically can't. This battle takes place in the private arena; it was fought between Netflix et al and Comcast et al, and the property owner won (of course).

How does all of this relate to the FCC's actions this month?
------------------------------------------------------------

So now let's return to the original topic: the proposal the FCC revealed this week.

### What effect will a repeal of net-neutrality rules really have on today's internet?

I do have some legitimate concerns:

-   **ISPs could prioritize their own content above the others.** That's a thing that Comcast/NBC, Time Warner/Spectrum/CNN/HBO, and AT&T/DirecTV consumers should especially look for and report to the rest of us. Those companies own a massive portfolio of other media properties: TV and radio stations, websites, original content, often in competition against others and so with a huge incentive to shape the internet worldview their subscribers receive.
-   **ISPs could play favorites against any content they dislike for *[insert reason here]*.** An outlet that, say, has a contrary political opinion (conservative news site, perhaps?) could suddenly find their content struggling to reach their audience, notably if they don't have the market strength to afford the size of partnership a player like Netflix needs to forge in order to overcome network "congestion" .
-   **ISPs enjoying government-sanctioned monopoly status would be most prone to reckless behavior.** More on this point below.

The other concerns don't ping my radar, because they discount the presence and potency of healthy competition. If/when an ISP commits to a shitty act, the others who aren't being shitty will reap the benefit from the defections in that market. If AT&T imposes Draconian limits on my wireless data plan, at least one other carrier will produce a superior plan. (Just consider how T-Mobile flipped the tables on Verizon, AT&T, and Sprint, when they unveiled an unlimited data plan.)

### Regulation is necessary for correcting ***marketwide** abuses*.

And, to be honest: in the case of the effective monopolies most cable companies enjoy from city governments, consumers are significantly limited --- in some cases, they don't have a second choice. In those markets, regulation is most justifiable. And the regional authorities of those areas should have full authority to intervene in defense of their residents. If I were running the opposition's campaign, I'd be focusing a lot of energy against the section of the FCC's proposal that would prohibit states from enacting legislation that supercedes the FCC's authority with respect to net-neutrality. The option for regulation should be on the table for municipalities in cases where the monopolist misbehaves.`,
  },
  {
    legacyId: 3,
    slug: 'cell-network-location-privacy-calea-carpenter-united-states',
    title: 'Does location privacy exist anymore?',
    excerpt: 'The U.S. Supreme Court will soon decide whether warrantless seizure of a person’s cell network usage records violates the Constitution. What’s really at stake? Hasn’t the Constitution and court already addressed the issue?',
    category: 'other',
    status: 'published',
    publishedAt: '2017-11-29T00:00:00.000Z',
    readTime: 5,
    bodyMarkdown: `The U.S. Supreme Court will decide whether warrantless seizure of a person's cell network usage records violates the Constitution. Of course it violates the Constitution --- as the "third-party doctrine" has violated the Constitution's prohibition on warrantless seizure of a person's private communications. The sole reason why the attorney general claims we have no "reasonable expectation of privacy" in this case, is that the third-party doctrine causes that effect!

The policy remains unconstitutional, because *warrantless* seizure as it pertains to private communications is an *unreasonable* government action. At the time of the [Fourth Amendment](https://en.wikipedia.org/wiki/Fourth_Amendment_to_the_United_States_Constitution)'s adoption, in the 1790s, people communicated orally in-person or in writing via letters, all of which were obviously private unless they were issued to the public. A hundred years later, in the 1890s, when the telephone recorder became a thing, courts prohibited warrantless wiretaps for that same reason: unless the phone calls were made to the public, they were obviously a private communication.

Constitutionality of warrantless wiretaps
-----------------------------------------

Consider Associate Justice Louis Brandeis's opinion in the 1920s, from [Olmstead v. United States](https://en.wikipedia.org/wiki/Olmstead_v._United_States). He acknowledged the telephone as "a public service furnished by its authority," and saw no reason why a telephone call's content should be less protected than the contents of mail. Moreover, he emphasized its greater importance in value to the private citizen:

> **"the evil incident to invasion of the privacy of the telephone is far greater** than that involved in tampering with the mails."
>
> *Louis Brandeis, Supreme Court Associate Justice, in opinion of *Olmstead v. United States**

Forty years later, through its decision of [Katz v. United States](https://en.wikipedia.org/wiki/Katz_v._United_States), in 1968, the court essentially affirmed Brandeis' opinion:

> "One who occupies [a telephone booth], shuts the door behind him, and pays the toll that permits him to place a call is **surely entitled to assume that the words he utters into the mouthpiece will not be broadcast to the world."**
>
> *Potter Stewart, Supreme Court Justice, in opinion of *Katz v. United States**

### "Reasonable expectation of privacy"

In Katz, the court, via Justice John Harlan's opinion, established a limit to the Fourth Amendment's protections. This is where we become acquainted with the definition of a "reasonable expectation of privacy."

> "(a) that an enclosed telephone booth is an area where, like a home, and unlike a field, **a person has a constitutionally protected reasonable expectation of privacy**; ..."
>
> *John Marshall Harlan II, Supreme Court Justice, in opinion of *Katz v. United States**

In [the case before the Supreme Court today](https://en.wikipedia.org/wiki/Carpenter_v._United_States), the government's argument hinges on the assertion that the defendant, Timothy Carpenter, was engaged in a communication for which he had no reasonable expectation of privacy. Imagine how corrosive such an argument can be when it can be applied to the act of merely *turning on* your phone (which is what the government is arguing for)!

The portability of a cell phone --- the variability of the origin of a placed call --- is not a proper excuse for a wireless wiretap. It's not even a proper excuse for a warranted one! Yet that is exactly what the attorney general argues against when he defends the government's actions upon the "third-party doctrine."

### The "third-party doctrine"

In a nutshell, via Wikipedia's [article](https://en.wikipedia.org/wiki/Third-party_doctrine):

> "The third-party doctrine is a United States legal theory that holds that **people who voluntarily give information to third parties**---such as banks, phone companies, internet service providers (ISPs), and e-mail servers---**have "no reasonable expectation of privacy."** A lack of privacy protection allows the United States government to obtain information from third parties without a legal warrant and without otherwise complying with the Fourth Amendment prohibition..."
>
> *Wikipedia article on the *third-party doctrine**

So, the first question one asks should be, "do I *voluntarily* give my location information to the cell network providers when I use my phone?"

Do you have a capability to prevent the providers from knowing which of their cell network towers your phone is connecting to? Answer: *no, you do not have that choice.*

Would a person using a wired telephone 50 years ago have had the capability to prevent the phone network operators from knowing the location of the property where their line was installed? *Of course not.*

And so that begs the question: ***Why* has the law been treating wireless communication privacy so differently?**

How I see it, there's no legitimate excuse for making an end-run around the Fourth Amendment that wouldn't also apply to pre-cellphone era communications technology. Nothing prohibits law enforcement agencies from seeking warrants in accordance with the Fourth Amendment's prescription to seize a private communication.

Your location privacy vs. *[insert reason here]*
------------------------------------------------

The question before the court is essentially: When (if ever) should law enforcement agencies have permission to warrantless-ly know the location of a phone?

That's a bigger question than "are they allowed to tap my phone calls without a warrant?" Yet, most media's coverage is missing this point..

Fortunately, the folks [writing for Wired](https://www.wired.com/story/supreme-court-must-understand-cell-phones-arent-optional/) *are* on point:

> The justices will have to confront the fact that absent a ruling that requires police departments to obtain warrants to retrieve cell phone location data, cell phones will render our lives involuntarily transparent.\\
> At its core, the *Carpenter* case is about whether Americans' rights to privacy should turn on whether they "voluntarily" choose to have a cell phone.
>
> *WIRED*

I'll be watching the Supreme Court's developments about this case.`,
  },
  {
    legacyId: 4,
    slug: 'a-new-reason-why-you-should-ditch-email',
    title: 'A new reason why you should ditch email',
    excerpt: 'Every time you open a piece of email, you may inadvertently, quietly, very accurately tell the sender a lot about you.',
    category: 'process',
    status: 'published',
    publishedAt: '2017-12-13T00:00:00.000Z',
    readTime: 3,
    bodyMarkdown: `I stopped relying on email a while ago. It became a spammy landscape of screaming advertisements, a place with less text and more images, where I had a better chance at finding a shopping idea than an intellectual one. It felt like a relic of the 1990s, in the age of social networks, browser-based messaging, and interactive media.

But it's still holding our attention. It's still an engagement measurement tool --- for marketers moreso than for us, it seems.

Every email you open...
---------------------

Every time you open a piece of email, **you may inadvertently, quietly, very accurately tell the sender a lot about you:**

-   *when* you opened the email
-   *where* you opened the email --- which network were you on? were you at home, at work, at the coffee shop, on the road, in a grocery store?
-   *how* you opened the email --- which program did you use? was it on your phone or your laptop?

What's not always obvious, though, is the implications this tracking behavior has for your network of contacts: **whomever you forward that message to *also* becomes a target of the trackers.** All of *their* activity --- the when, where, how, etc. --- is immediately sent to the trackers when they open that cute email you decided to forward along, not knowing what it really contained.

Take this author's [experience](https://www.wired.com/story/how-email-open-tracking-quietly-took-over-the-web/) for instance:

> My email had been opened almost immediately, inside Cupertino, on an iPhone. Then it was opened again, on an iMac, and again, and again. My messages were not only being read, but widely disseminated. It was maddening, watching the grey little notification box---"Someone just viewed 'Regarding book interviews'---pop up over and over and over, without a reply. [...]
>
> That seemed crazy, so I emailed Streak to ask about the accuracy of its service... I was told that Streak is "very accurate," as it can let you know what time zone or state [and IP address and operating system] your lead is in... but **the public might chafe if it knew just how accurate that data was**---and considered what it could be used for besides honing sales pitches.

... and no one is safe!
---------------------

Even the highest elected officials are subject to this information extraction:

> "During the 2016 election, we sent a tracked email out to the US senators, and the people running for the presidency," Seroussi says. "We wanted to know, were they doing anything about tracking? Obviously, the answer was no. We typically got the location of their devices, the IP addresses; **you could pinpoint almost exactly where they were**, which hotels they were staying at."

It's location-aware email. Combine that with other data known related to your email address...

> So, if you sign up for a newsletter, even from a trusted source, **there's a one in three chance** that the email that newsletter service sends you will be loaded with a tracking image hosted on an outside server, that contains your email address in its code... to be shared with tracking companies, marketing firms, and data brokers like Axiom, if you as much as open an email with a tracker, or click on a link inside.
>
> "You can **compare it to the Experian data leak**, which exposed people's social security numbers, and could cause fraud. In my mind, this leak would be even worse. Because it's not just financial fraud, but intimate details of people's lives."

This is definitely something we all should be aware of.

Go read the [full story](https://www.wired.com/story/how-email-open-tracking-quietly-took-over-the-web/) at Wired.`,
  },
  {
    legacyId: 5,
    slug: 'why-tdd-it-takes-the-guesswork-out-of-debugging',
    title: 'Why TDD? It takes the guesswork out of debugging',
    excerpt: 'Hate debugging your code? Then do yourself a favor: test your code before you write it. You won’t have to guess anymore, if you take the test-driven approach.',
    category: 'engineering',
    status: 'published',
    publishedAt: '2017-12-26T00:00:00.000Z',
    readTime: 5,
    bodyMarkdown: `I **hate** debugging my code.

The process is more than just a frustration. It reminds me of my original solution's inadequacy. It requires me to waste spend time reviewing code I've seen probably ~~a million~~ a lot of times already, in hopes that I'll miraculously stumble onto the error. All this effort spent in vain devours the excess time in my schedule, so I end up having to deliver something less awesome than I really wanted to create. Or, even worse, it runs out the clock so much that I miss my deadlines and I have to scramble.

yeah. I *hate* bugs.

They are by far the most unpredictable element of a time schedule. The project can have a ridiculously solid definition of its requirements, and still have no legit quantifiable prediction for the amount of time it'll need for the debugging phase! How can one accurately estimate how much time it will take to resolve an issue that is, by definition, deceptive against the guy who's writing the code? The best laid plans of mice and men... yada yada.

Bugs kill me.

So, after several rounds of butthurtedness from my code (and my faulty, entirely human brain), I have sought a better way. ***There must be a better approach to coding***, I thought, that takes a more proactive approach to the development cycle with respect to debugging.

Turns out, there is!

What is test-driven development (TDD)?
--------------------------------------

[Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development), or TDD for short, is a stupidly simple concept: **test your code *before* you write it.** You write your test criteria first, then you write the function that will successfully pass that criteria. When you work this way, you'll be testing at the same time you're developing --- so it doesn't become an afterthought, it's not half-assed, it's not cast off as an annoying distraction. Testing and documentation can actually be fun!

### It describes your program in terms of tests

A pretty cool side-effect of testing before you write is that you can actually describe your program *in terms of* the test criteria --- a super efficient way to protect against [feature creep](https://en.wikipedia.org/wiki/Feature_creep).

Feature creep is Definitely. Not. A Good Thing ™. We want our processes to leave zero room for the feature creepers.

#### For example...

Let's consider the code shown in the following screenshot; it's playing card hand evaluation test for a Blackjack simulator I'm writing in my spare time (because, incidentally, I'm obsessed with odds analysis).

In this game, TDD is the King. Human is the Ace.

One of the core requirements of that program is the ability to identify the relative values of different cards. How can I know that it does so correctly? I write a test that uses the program's function library to produce two different cards --- like an Ace of Spades ("As") and a King of Clubs ("Kc") --- then I have it compare their relative ranks. A successful test should agree with the known fact (i.e. the [assertion](https://en.wikipedia.org/wiki/Assertion_(software_development))) that an Ace ranks above a King.

In order to ensure that the program correctly produces a deck of playing cards, I can write a test that instantiates a new Deck and confirms some basic axioms about one. A complete deck should have 52 cards. Specifically, it should contain 13 cards (Two through Nine, Jack, Queen, King, and Ace) for each of the four suits. If that basic test fails, then I know that a fundamental error resides in the code I wrote to define my Deck class, and so I can ignore the subsequent errors until my code passes that test.

### It validates your program's functionality (no more QA!)

Just like type checking helps to validate *input*, **TDD helps to validate *functionality.*** Just like a type declaration will immediately alert about an unfulfilled requirement for a function's input, a test criteria will immediately alert about an unfulfilled requirement for the program's functionality.

Traditionally, a dev shop's QA team validates functionality. The QA folks are the ~~first~~ second level of defense against problems that cause poor user experiences. Which is to say, they catch the requirements overlooked by the developers or the project spec itself. This layer of overhead in a release pipeline is obviously going to be less efficient than one that effectively catches the errors earlier in the process, leaving a QA team to handle more specialized, less easily automatable testing.

TDD behavior can elevate organizations to the next level.
---------------------------------------------------------

I've become a huge fan of TDD and its relative, [behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development) (BDD), because **it's the easy --- and hugely effective --- answer** to our desire to not dedicate time toward documentation while we'd rather be writing code. TDD makes program documentation an integral part of the coding process. Moreover, since the test routines are written for automation, we can hand off that tedious task to a CI/CD pipeline --- and justify the build-out of one if we don't already have one in place. #symbiosis

Just in the last few months, I've spoken with several companies who have specifically mentioned TDD/BDD in their upfront pitches for their job openings. Those that strike me as **the most driven orgs are frequently among those who ascribe to the test-driven approach.** Needless to say that you should be learning TDD by now.

### Suggested tools

If you don't yet have a favorite testing framework, I suggest taking a look at [Mocha](https://mochajs.org/) --- it's the one I use in my NodeJS projects, along with [Chai](http://chaijs.com/) for input validation and [Istanbul](https://github.com/gotwarlost/istanbul) for code coverage analysis and reporting. (Please let me know if you have some other suggestions!)`,
  },
  {
    legacyId: 6,
    slug: 'why-need-react-for-site-ui-contextual-awareness',
    title: 'Why you need React for your site’s UI: contextual awareness',
    excerpt: 'To provide a truly context-driven experience, we need a context-driven interface. React delivers that in spades. But what are the costs? And how do we make the case for it?',
    category: 'engineering',
    status: 'published',
    publishedAt: '2018-04-11T00:00:00.000Z',
    readTime: 9,
    bodyMarkdown: `When heavyweights ring in, I take notice.

The devs at TechCrunch recently undertook [a total overhaul of their website](https://techcrunch.com/2018/03/13/welcome-to-the-new-techcrunch/), and they chose React to power it. They focused their efforts around *contextual experience.* In other words: they focused especially on a need to give their site more context awareness and greater capabilities for case-by-case intelligent prediction about each visitor's behavior.

Whereas other teams may still focus on page *views*, they're focusing on page *engagement.*

> Our premise was that reading an article should feel enjoyable, and that it should be frictionless and **fun to get more context** surrounding whatever you're consuming, whenever you want it. For a while now, behavior on the web has been shaped by the networks. People find links, they click on links and they're dropped into a story without context. Links aren't enough, they need to be able to catch up or read ahead and, in general, be better informed by the product. **The burden shouldn't be on them** to put the story together.

To provide a truly context-driven experience, we need a context-driven interface. We need to be able to make things happen as quickly as our visitor's mind is running. So, we need our service to become more *contextually aware,* so our our communication between our services, and our interface's conversation with the user, will carry less overhead. Minimal overhead via optimal compression --- that's what we're aiming for.

This is why I've turned my attention into React. As I look for ripe areas for growth in my skill set, I see a field of delicious fruit here. React was a newbie just a few years ago, and Angular was gaining popularity, but neither were deployed on a mass scale. Nowadays, *half* of the unsolicited messages I receive from recruiters specifically mention React in their desirable skills list. It's harvest season, yo.

*So, what's so great about React?*

More than a fad, React delivers more front-end potential.
---------------------------------------------------------

The street cred of making a React site is obvious. Every developer loves the opportunity to show-off their front-end skills. (Just take my site as an example: I've refreshed it three times already over the last year. Flexing muscles is super fun work!)

But for a tech to gain a critical mass of support, **it needs to deliver real, measurable advantages.** They need to be seen and felt by those who get to make the calls. You need to draw up bullet points and put them in front of the people who decide when and how the web's major properties undergo an overhaul. Then, the magic can happen.

So, how do we determine whether React is an appropriate tech for our web properties? React is a very magical thing indeed. But the benefit isn't as tangible as some other front-end features.

#### Easy sells: low friction + high benefit

Here's an example of a tangible feature: grid frameworks. (btw: you're currently reading a page gridded up with [Bootstrap 4.1](https://getbootstrap.com/docs/4.1). #tmyk)

-   **Grids immediately make our life less painful.** No more carrying around ad hoc sets of CSS rules. We won't have to manually cobble them together for each project we undertake.
-   **Grids impart a foundation for a common style guide.** Those guides help us to deliver us a consistently familiar, relatively easy means for prototyping, theming, and delivering on a schedule. Wins all around.

It's a no-brainer decision: Learn a few more rules and workflow modifications in return for a huge boost in productivity.

#### Less-easy sells: paradigm shifts

Sometimes, the new awesome tool doesn't make itself easy.

React is one of those. It reveals its secrets only after you've taken some time to learn it. It doesn't sacrifice its complexity for the sake of easy comprehension. It's complicated --- and it's *lightning*.

That's a good thing. We don't want React to sacrifice its awesome parts for the sake of any laziness.

We see most of the web's visitor traffic happens now over-the-air. It's all about the wireless devices: smartphones, tablets, hotspot-ed laptops, the IoT ecosystem, and whatever else humanity cooks up tomorrow.

To really understand the case for React, have a better understanding for the full potential of React as a force of technology in the future world.

#### Possibly even *harder* sells: the subconscious effect

So, we want to use React for our next project. Let's consider how to achieve our goal.

We won't be selling eye candy. Though we can manipulate our new React-driven UI's components however we see fit, React still remains transparent to a website's visitor.

... Which causes us another dilemma: Not only is React going to be potentially difficult for us and our team to wrap our heads around, it will be even more difficult for a non-dev to understand why we want to overhaul these things on the company's time and dime.

##### We're selling benefits that accrue at the subconscious level

With React, we actually sell the intangible qualities of experience. How do we communicate those things effectively?

In doubt about the benefits of investing heavily in your users' subconscious experience? Look to Google. The brains of Mountain View spend a ton of time and money working to shave *milliseconds* off the load time for their results pages. A millisecond is a small fraction of the amount of time it takes for us to blink, but it's an unprofitable delay to Google's ad-selling rate. Data compiled from billions of searches shows that human behavior *does* change in terms of milliseconds of wait time. Perhaps the user never consciously has such reaction. Yet, it's a very significant one that some people at Google regularly lose sleep over.

We should pay attention to our users subconscious as well. The user's *experience* is where magic truly happens.

How is React different from anything that's come before it?
-----------------------------------------------------------

React is a paradigm shift for front-end developers.

Remember 1998 brought us \`XMLHttpRequest\` and gave us our first real taste of dynamic pages? We had JavaScript already, but now we could load assets long after the page had completed initial script execution. It was a game changer. *Dude.* It was *POWER.*

React is another leap of that magnitude.

Remember that time when you jumped into Node and nothing made sense anymore, because **all** the things became asynchronous?

Yeah, it can be like that.

### Now, everything is objects.

React is a framework that formally brings object-oriented (OO) process down to the HTML level of front-end web page construction. If you've ever gone from a language like C (which is non-OO) to a language like Java, where nearly everything is strictly an object, you remember the headaches delivered to you ad nauseum when you learned that the object-relationship model was now your pesky BFF. (And if transitioning to OO didn't make you pain, I dare you to tackle a purely functional language, like Lisp, and avoid headaches *then.* It eventually happens to all of us, buddy.)

#### Pages are obsolete.

In The Land Of React, what you're so used to calling a "page" is no longer a page; it's now just an initial state of the DOM. The "page" your server sends a client is now just a bare shell that contains a \`div\` sporting a unique \`id\` attribute --- nothing you'd call "content." The shell is filled dynamically, according to your design, which you define meticulously using React's object-oriented infrastructure. The page you intend to display to your visitors is now just a constellation of structured React components, with each having the capability to govern its behavior and its children's behavior, and to interact with components up and down its family chain via life-cycle methods, props, and properly-crafted callbacks.

It's practically like having a *program,* rather than a *page,* running in your browser. When you hear the terms single-page app (SPA) or progressive web app (PWA), it's likely driven (or should be driven) by a framework like React.

### All the pain, but with sweet benefits!

Initially, there's likely going to be pain for your brain.

The flip side is nice, though. Once you get over the hump of conceptualization, you get to enjoy:

-   The [time to first byte](https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing#slow_time_to_first_byte) (TTFB) is now near-zero. Happiness will increase in all things around you.
-   Also, you have greater control over the [time to first meaningful paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_meaningful_paint_and_hero_element_timing) (TTFMP). This number is a hugely important metric for search. Google specifically mentions TTFMP in dev docs [here](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint), and in discussion [here](https://webmasters.googleblog.com/2018/01/using-page-speed-in-mobile-search.html) about SERP signals for mobile visitors. Through its [AMP initiative](https://www.ampproject.org/), Google continues to force the entire web to move forward on the leading edge, as they must think about TTFMP and TTFB as major considerations of SEO.
-   Now, thanks to the natural separation of your site's presentation and controller layers from the API and other back-end services, your front-end's production environment is handled on the client's hardware. It doesn't run any expensive IT infrastructure you may or may not have bought for this exact moment in time. Be sure to make more advantage of client's languishing CPU cycles, by the way. (Want to someday emulate a successful native app? Go for it, and leverage HTML5! Now you have the power, literally.)
-   As a bonus from your hard work separating the front-end and back-end constituents of your app, you're now free to develop *any* front-end experience. With a considerably lower cost of startup overhead, you can formalize your data layer's exposures as a versioned API spec, and develop the front-end with confidence in your team's capability to experience no unintended breaking changes. ([\`wp-json\`](https://v2.wp-api.org/), anyone? [data as a service](https://en.wikipedia.org/wiki/Data_as_a_service), amirite?)

That's just a highlight of the benefits I've uncovered. I'm finding more of them while I continue to learn and play with React, and I expect I'll write in more detail about some of them as I make more progress.

Yeah, it's also a super-fun power tool!
---------------------------------------

Let's be real here: Power tech is adrenaline. If I had unlimited time in the day, I'd go beast for stuff like React, consumer APIs, variable-centric style sheeting (incidentally, I'm currently working on one as a stealth hobby), SVG visuals... and the list goes on.

So, yeah: **consider the immense upside!** Take up React, get through the growing pains, and enjoy being in the ranks of devs in high demand and great prospects for future employment. 🙂`,
  },
  {
    legacyId: 7,
    slug: 'how-use-chrome-lighthouse-improve-site-performance-page-speed',
    title: 'How I use Chrome’s Lighthouse to improve site performance',
    excerpt: 'The more effort we put toward fixing a bug, three others appear. This week, as I was improving my site’s performance, Google’s Lighthouse became my new best friend.',
    category: 'process',
    status: 'published',
    publishedAt: '2018-04-18T00:00:00.000Z',
    readTime: 7,
    bodyMarkdown: `Over my years of personal experience, I've found to be true, that maintenance has its way of killing perfectionism. We try so hard to solve all the things, but all the things are never solved.

Don't just take my word for it. Listen to [xkcd](https://xkcd.com/1205/).

Though it may seem that the natural state of things is to defy one's every attempt. The more effort we put toward fixing an issue, three other undesirable ones appear. An endless string of code snippets yell out "help me!" as one human struggles in vain to afford time for all of them.

> *Sorry, little binary buddies, I simply don't have enough hours in my sprint!*

We've gotta triage.
-------------------

It's technological triage, and it sucks. It can be a depressing fact but it's important reminder of what we, as developers, are really trying to do each day:

1.  Add judiciously
2.  Maintain enough to quell the behemoth
3.  Sleep
4.  Shower
5.  Repeat.

(Feel free to add another shower or three in that mix. It does wonders to your concentration.)

**How do we allocate the resources in a balanced way?** How do we know when to fix, when to ignore, when to push, when to take a break? How do we balance the equation?

#### Time is money, bro.

As a developer always striving for the perfect mix of obsession and expediency, I like metrics that tell me where I should focus more of my time in my bug hunting efforts. Metrics are great shortcuts for my time and sanity.

> *Where do I need to focus? Ah, right, in Area X, because that's what this intelligently-informed metric says, and I'm in no position or mood to question it.*

This week, as I was dedicating my life to resolving all my site's bugs, **[Google's Lighthouse](https://developers.google.com/web/tools/lighthouse/) became my new best friend.**

Lighthouse is a potent potpourri of performance metrics.
--------------------------------------------------------

Some of you may have noticed that I've made several releases to my site over this past month. In fact, I'm already building a recipe for the batch of hotfixes hot on the tail of my site's version \`1.5.0\` release, which I pushed a few days ago.

##### I plowed through a ton of the top-grass.

-   little UI tweaks
-   minor script bugs
-   ya know, the small things.

#### Plus, I added some scoops of whipped-cream topping.

-   lazyloadable images
-   search-engine chummy [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD)
-   and some cool Google Analytics indicators. Yummy.

#### Now, I'm seeing mostly shrub and hidden weeds.

This is where the *real* maintenance work begins.

So, to help me sort though the brush and weeds, I fired up Lighthouse and ran it on my site's heaviest page, the home page.

#### ... and got this result:

> Welp, looks like some website TLC is in order [#DevLife](https://twitter.com/hashtag/DevLife?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/vOVEqj1ty5](https://t.co/vOVEqj1ty5)
>
> --- Alden Gillespy (@AldenGillespy) [April 12, 2018](https://twitter.com/AldenGillespy/status/984543725329223680?ref_src=twsrc%5Etfw)

My score wasn't impressive (unless you're impressed by bad scores).

Yeah, you could say my tweet was understating the issue.

### According to Google, my site evidently needs *a lot* of TLC.

I expected excellent scores in the SEO and best practices realms, **but the 29 score on performance was a bitter pill.** In developing my own site over a 100-megabit connection, I had neglected the constraints put upon my visitors from 3G Land, while Lighthouse caught them with ease.

Face, meet egg.

Though my initial performance disappointed me a bit, this report has an upside for me: **A failure is a superb opportunity to succeed!**

In its adorable language of red, orange, and green, Lighthouse is telling me that I:

1.  am not perfect (but no surprise there, really).
2.  should have used it earlier.
3.  now have a laundry list of todos it's provided me and knows I can accomplish. (Otherwise, why would it tell me these things?)

So, I set out on a quest to improve upon my first-round score.

> In A World, where bugs rule the galaxy, a HeroHuman awaits, armed with devtools, data, and a killer demeanor, enough to slay even the *toughest* critters.
>
> *Don LaFontaine, beyond the grave, saying all the things he should have said but was never paid to say. R.I.P.*

Results after first round of improvements
-----------------------------------------

Over a handful of hours, and also probably from as many cups of coffee, I was able to improve my site's Lighthouse score dramatically!

> Handful of tweaks -> Lighthouse score goes [#upupup](https://twitter.com/hashtag/upupup?src=hash&ref_src=twsrc%5Etfw). Bloated ext lib is dogging me. Will blog abt solution. Time to push! [#devlife](https://twitter.com/hashtag/devlife?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/SbBrY9vAIV](https://t.co/SbBrY9vAIV)
>
> --- Alden Gillespy (@AldenGillespy) [April 14, 2018](https://twitter.com/AldenGillespy/status/984962586365095937?ref_src=twsrc%5Etfw)

Though the Performance metric doesn't yet report me a score in the green range, **it's a 20+ point increase from my previously terrible score,** a boost into the orange range, and orange is better than red here.

TL;DR: Lighthouse clearly thinks there's a significant improvement to be noted --- Woohoo me!

#### But, we're not yet in green territory.

Why? Because Lighthouse is especially unhappy about some things I don't have direct control over.

That, of course, is *not* an excuse for me. A responsible supervisor wouldn't look at that and think "no problem here." Lighthouse is Google's product. If I want to please the gorilla, then I should definitely listen to its demands.

**Now, I have a solid case for spending time and resources toward developing a more efficient solution.** The next step: Pinpoint *exactly* what are the problems whereas Lighthouse has given a high-level analysis.

### Major takeaways

This meticulous process to discover, classify and prioritize those problems led me to some pretty neat conclusions.

##### Twitter's \`platform.js\` is a bloated #whale.

Twitter's impact on a page's performance is *gross.* I'm not surprised that my use of external libraries would aggravate Google's effort to minimize my home page's weight. But, I was shocked to see just how much unnecessary code there is in Twitter's payload. Evidently, ~95% of the their lib code is deadweight to my site.

##### For just displaying a simple timeline, I definitely *don't* need everything.

Why can't Twitter just be nice and offer minimal subsets for major cases, like when someone just wants to embed a simple timeline? Feels to me like an oversight on Twitter's end, or it's some heavy desire of theirs to accomplish a load-once scenario, but at the end user's expense. Either way, not cool, and I'm not happy about it.

Clearly if I want to make good on my commitment to ace the Lighthouse exam, I need to make a better solution for my site.

#### I need to eliminate or sharply reduce site's reliance on Twitter's \`platform.js\` script.

Instead of loading that gorilla's weight, I'm going to roll my own. I'll [poll my timeline via their API](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html), then I'll cache and render the pretty things from their JSON response data. Perhaps I'll even package my solution as an open-source WordPress plugin. #efficiency #ownership #community

### TL;DR for this post, in one phrase: Big Bugs First.

While it can be appealing to us to *always* kill the small stuff first, the "small stuff first" strategy doesn't always lead us to the best outcome. If we always focus on the small stuff, we may never touch the big stuff.

Size matters.

Until I kill my site's dependency on a severely bloated external library, I'd be ignoring the biggest way to lower my site's technical debt.

If I ignore this Big Bug and resolve all the small bugs, I could still end up with my site having a terrible Lighthouse score, because the Big Bug is *so damn big.*

**Focus on the Big Bugs.** Don't ignore the small ones, *but especially don't ignore the big ones.* The goal is as much about the user's perceived experience (the *big* changes) as the overall picture (a string of *small* changes).

Conclusions
-----------

-   Just running my personal site through **Lighthouse told me a lot in terms of major areas for improvement.** Without that free rubric, my site may have gone on to annoy countless number of poor souls bound to a depressing 3G (or worse!) connection. What a horrible outcome that would have made.
-   Though my site is aimed at audiences that have near-constant access to high-speed internet, **I don't want to ignore a large segment of the world** community by prejudging them on the basis of their connection speed. And I *certainly* want to be super-conscious of Lighthouse's opinion of any site I aim at a broader audience.

#### Where to find Lighthouse

I highly recommend adding Lighthouse to your regular workflow. You can find it in Chrome and Chromium, in the Developer Tools pane, in the Audits tab.`,
  },
  {
    legacyId: 8,
    slug: 'millenials-toys-r-us-death-by-bad-leveraged-buyout',
    title: 'What killed Toys “R” Us? It wasn’t Amazon',
    excerpt: 'Amazon kills. Its sale-prediction technology is the queen, its logistics infrastructure the king. To their competitors, they are not merciful. But, strong as they are, this isn’t another death-by-Bezos.',
    category: 'other',
    status: 'published',
    publishedAt: '2018-11-06T00:00:00.000Z',
    readTime: 4,
    bodyMarkdown: `> I don't wanna grow up, I'm a Toys R Us kid. They got a million toys at Toys R Us that I can play with! From bikes to trains to video games, it's the biggest toy store there is! I don't wanna grow up, cause maybe, if I did, I couldn't be a Toys R Us kid...
>
> *I don't wanna grow up! You wanna grow up??*
>
> I wanna be a Toys R Us kid!

Every month, we're hearing of another major retailer suffering some form of death by Amazon's hand. Oh, Bezos, you cruel monster! Must you not destroy every symbol of our adolescence! Allow us some preservation, but I still want my Amazon Prime!

**Amazon kills.**
-----------------

Its sale-prediction technology is the queen, and its logistics infrastructure, proudly the king. Sooner or later, every seller of fungible goods will **die** by the Sword of Bezos!

Recently, my #millennial generation's beloved [Toys "R" Us formally announced its liquidation](https://www.wsj.com/articles/toys-r-us-tells-workers-it-will-likely-close-all-u-s-stores-1521060803). **Poof.** As quick as the snap of a finger, my childhood memory felt a pain. The childhood memory becomes an adulthood memorial, almost immediately.

How could Toys "R" Us have failed us so dramatically?
-----------------------------------------------------

Above all, they were the biggest toy store there was! After reaching epic levels of success and brand identity awareness in the adolescent commercial market, what were the odds they would have gone bankrupt?

### They had everything.

During their height, they had it all:

-   Power Wheels
-   killer bikes
-   remote-controlled cars
-   battery-powered trains
-   awesome action figures
-   bouncy balls
-   board games
-   video games
-   playpens
-   sports gear
-   practically *anything* a kid would want to put on his wish list for Santa!

They *owned* the toy market. In fact, their reason for existence was to be **the** one-stop shop for anything a kid's heart desired. In likely consequence, a parent of young children could literally clear an entire holiday shopping list with a single visit.

#### In the end, they had nothing.

As soon its benevolent owners had encumbered its balance sheet, Toys "R" Us had no shot. When Toys "R" Us needed liquid capital for a large-scale war against Amazon, they fought a war equally against the phantom weight of debt interest.

Eventually, their time was up.

Now, Toys "R" Us and its owners have reduced itself merely to a brand identity. Today perhaps it's so fortunate and that its name and logo survive the sale of everything else.

I was incredulous.

> *Amazon can't be so good.*
>
> *They can't be this cruel! *
>
> *Is this **really** another #deathbybezos ?*

#### It ***isn't*** actually an Act of the Amazon, but it certainly feels like one.

The very long, tortured demise of Toys "R" Us began many, many moons ago. To tell this story, we must go way back in time... to the summer of 2005.

### The Golden Years for sure, amirite?

Ahhhhh yeahhh, the year two thousand five. 13 years ago, baby.

*Well... I mean, you know... **except***** for** full-scale invasion and occupation of the Middle East, and the full amount of that tab to be borne by our posterity.

But don't forget! We also **were looking on the bright side:**

1.  the Dot-Com Crash was behind us
2.  the Housing Bubble was reaching all-time highs
3.  Credit was a chocolate stream
4.  Economy was booming!

While the internet continued its global crusade of technological progress, more humans used the medium for social communication. More sales were going online.

Amazon Prime was only a few months old. But it wasn't a known thing to most shoppers yet, because social media (and two-day shipping) was a very new thing in 2005. The digital sales days were still in infancy. As gorilla-sized, niche-occupying retailers like Toys "R" Us each proved a fresh retail boutique sales model, they collectively were given a new moniker: They now were known *category killers.* Who among them was to worry? What possibly could retailers awash in cash really have to worry about? They were busy slaughtering their competition's year-end figures --- with ease! They were riding high!

They clearly were nowhere near the entrance to a sad realm of torturous pain and worry and financial dire straits.

#### ... or *were* they? ...

Enter three companies:

-   Bain Capital
-   Kohlberg Kravis Roberts
-   Vornado Realty Trust

What do they all have in common?

If you really want to know what's responsible for killing Toys "R" Us, I can explain it in two words: **Leveraged buyout.**

That Wall Street trio sucked the value completely from Toys "R" Us's balance sheet, as it took a long, final ride, to the bottom. From the moment they closed their $6.6 billion debt deal, Toys "R" Us was destined for Chapter 7.

*Everything Dies™.*`,
  },
  {
    legacyId: 9,
    slug: 'shadowcat-pictures-youtube-video-bellagio-fountains-airbus-boeing',
    title: 'Say Hello to Shadowcat Pictures, my video channel on YouTube!',
    excerpt: 'Let me introduce you to my video media company, Shadowcat Pictures. Over the past two years, I have developed rich video content for distribution on YouTube. Today, I announce my project to you all.',
    category: 'cinematic',
    status: 'published',
    publishedAt: '2020-03-21T00:00:00.000Z',
    readTime: 3,
    bodyMarkdown: `Let me introduce you to my video media company, [Shadowcat Pictures](https://www.youtube.com/channel/UCawX8EIpDdp2aLrxnHo7mcg/)! Over the past two years, I have developed [rich video content](https://www.youtube.com/channel/UCawX8EIpDdp2aLrxnHo7mcg/videos) for distribution on YouTube and major social media channels. Today, I formally announce my project to you all. I hope that we can together grow Shadowcat's audience and appeal to video consumers, media-lovers and aspiring creators from every background.

As of this writing, Shadowcat has two major channels of content:

-   High-quality videos of **performances of the world-famous Fountains of Bellagio**, along "the Strip" in Las Vegas, Nevada; and
-   Compelling first-hand perspective videos of **departures and arrivals of passenger commercial aircraft** at major airports of the United States.

Video of the Fountains of Bellagio, in Las Vegas, Nevada
--------------------------------------------------------

Watch an see a broad selection of performances by the world-famous Fountains of Bellagio.

[This channel immerses viewers](https://www.youtube.com/playlist?list=PLYOSU0PeyMbxVxUTbvx1RDnMEHmmos-4Z) by a variety of techniques intended to draw the viewer's attention to each performance's major elements. It aims to create the fullest possible visual experience from each song on the fountains' schedule.

Visit this one-of-its-kind visual spectacle at the heart of the Las Vegas Strip, near Las Vegas Boulevard and Flamingo Road, in front of the Bellagio Hotel and Casino.

The [Fountains of Bellagio](https://bellagio.mgmresorts.com/en/entertainment/fountains-of-bellagio.html) are a technological marvel spread a quarter-mile in length. So, the shows are nearly impossible to understand completely without a trained eye to guide your focus. My videos have a primary goal to accomplish that task.

"Aircraft and Airports" that can blow you away (literally)
----------------------------------------------------------

Watch and see the best angles of landing and departing jets from world-class airports.

My [newest channel to Shadowcat's collection](https://www.youtube.com/playlist?list=PLYOSU0PeyMbyUHYNgA8iK-Aa3cLEHx8lO) puts viewers in prime viewing spots at major international airports where the world's largest and most beautiful passenger jets often make their visits.

The first video in this channel is [an extremely close view of an evening departure of a Qantas Airbus A380](https://www.youtube.com/watch?v=I4GVCyPez-4).

The Airbus A380 is the world's largest commercial passenger aircraft. Even the best video can't capture this beauty's size and ferocious strength.

The A380 is a giant, four-engine beast. As you can see and hear on the video, it creates hurricane winds even while at idle speed! The north-side runways of [Los Angeles International Airport (KLAX)](https://flightaware.com/live/airport/KLAX) are the airport's shortest in length, but also are the most accessible to spectators. So we are fortunate whenever a heavy aircraft departs Runway 24L. Evening departures bring an especially dramatic mood to the experience. By these scenarios, the FAA creates a breathtaking event to witness in-person.

I have high hopes for this channel! Please [let me know on YouTube](https://www.youtube.com/channel/UCawX8EIpDdp2aLrxnHo7mcg/discussion) if you enjoy these videos, and which aircraft you most want to see in final approach or takeoff. I will do my best to capture a spectacular point-of-view.

Looking for a Video Expert? Hire me!
------------------------------------

I am always looking for new experiences to bring to the world's video audiences. If you have an idea and need a video expert to produce it, [send me a message!](https://aldengillespy.com/blog/2020/shadowcat-pictures-youtube-video-bellagio-fountains-airbus-boeing/#) I have years of experience in every stage of video production, with a diverse selection of equipment. I would love to hear from you and see how I can make your dream a reality.`,
  },
  {
    legacyId: 10,
    slug: 'best-practices-naming-conventions-in-react-code-development',
    title: 'Best Practices: Naming Conventions in React Code Development',
    excerpt: 'Consistency in variable types. Consistency in variable names. Consistency in methodology. Here is the React naming conventions guide I\'ve developed over the years.',
    category: 'engineering',
    status: 'published',
    publishedAt: '2025-11-22T00:00:00.000Z',
    readTime: 5,
    bodyMarkdown: `In every computer science course, in every class on software engineering fundamentals, the topic of "consistency" arises. Consistency in variable types. Consistency in variable names. Consistency in methodology, period.

As I've developed code, and especially in my time with React, I've taken that knowledge with me and applied it to my tasks. Consistency irons out the endless series of wrinkles I come across in development exercises. And for good reason. Those wrinkles I've ironed out saved me endless headaches in trying to backtrack and locate the source of an error, for instance. (And who doesn't want to avoid headaches?)

**There are no true shortcuts in software development.** Maybe the wrinkle saves you time, but only in the short-run. Eventually, you have to pay the engineering debt. And if history is a true indicator, that engineering debt grows with compounded interest quite quickly. Most of that interest is repaid in units of time.

So, let's dig into this topic and avoid a lot of that time cost.

## File naming conventions

Since I've been developing in React, I'll keep my examples in terms of React. But they apply to software engineering in general and should be well-considered by any software engineer.

Here is the React naming conventions guide I've developed after performing some research, incorporating sets of best practices, and adapting it all to my personal taste:


### 1. In almost all cases , use PascalCase for component files.

Among all of the conventions I'll mention in this article, PascalCase is the best at hinting at words. Each word is capitalized. You can easily scan names and identify that which you intend to investigate. \`ThatPeskyLongNamedComponentThatJustDoesntSeemToEnd\` is, at least to me, easily readable at-a-glance, even though it's long. It requires a minimal number of characters to provide its identity, and there's no question where one word begins and the other ends.

#### ... but is that really true?

Well, sort of. There is one exception: acronyms. So let me clear.

For acronyms, I've found it to be easier to identify the component's usage (as a file name or in code) by capitalizing every lettter of the acronym.

For example:

\`SomeCTAThing\`, NOT \`SomeCtaThing\`

Why? Because, above all, we actually _aren't_ breaking spec by doing this. In fact, I'd say that we're _enforcing_ spec by doing this. **Best practice suggests capitalization of every word in a component's name.** "CTA" is an acronym, a single-letter usage of each word in a name (or, think of it as a list).

**A "CTA" is a "Call To Action".**

So, \`SomeCTAThing\` is really "some call-to-action thing". It fits best practices, and it \\*ahem\\* calls out to me more easily in a file list, a list of components in a front-end design layer, etc.

Let me know whether this (not-quite-un-)conventional usage works for you.

### 2. Use camelCase for function files.

This is appropriate for both single-function files (\`someFormalAction()\`) or a collection within a file (\`someUtilityAction()\` within \`util.ts\`). It's familiar to anyone who's already gone through a beginner course, so why break spec?

Some things that fall into this category:

* React hooks (\`useSomeUtilityHook()\`)
* \`lib/*\` functions

### 3. Use kebab-case for all other files.

The hyphen between words is effective in hinting to the eye, and the lack of capitalization within the file name suggests the file doesn't go with something that is class-like (such as a component) or a non-component function (such as a page). It also adheres to the notion  that would be absurd to dedicate a file to a single variable (and accordingly use camelCase for its file!).

Some things that should be kebab-cased:

* Front-end page names (\`/app/some-page-location/page.tsx\`)
* Stylesheets (\`some-stylesheet-name.css\`)
* Type definition files (\`some-collection-of-type-definitions.ts\`)

### 4. Use strictly-consistent nomenclature.

Just as it's extremely important to ensure your directory structure is self-explanatory, you should also have extremely consistent file names (and names of components, functions, pages, etc.).

#### Consistent suffixes

You're developing for the front-end, which has code for individual pages. There's one for the home page, one for an About page, one for the blog, one for the contact form, etc. Use consistent naming, such as \`HomePage()\`, \`AboutPage()\`, \`BlogPage()\`, and \`ContactPage()\`. Using the suffix \`Page\` provides you a very simple hint in any errors to your console: if you see \`Page\` at the end of the culprit's name, you know it's a page!

No need to look in your \`/components\` folder when trying to find it.

No need to question it's purpose, either. It's a page. Because you named it so.

#### Consistent prefixes

Similarly, use consistent classification in your names. If it's part of the home page structure, prefix it with \`Home\`. If it's part of the blog structure, prefix it with \`Blog\`. And so on.

This avoids so many headaches at every phase of the development cycle. (Stack traces, anyone?)

#### Consistency is key

If every piece of code belongs somewhere, then (extremely) consistent nomenclature ensures that:

1. Every piece of code has a **family** (*prefix*)
2. Every piece of code has a **purpose** (*suffix*)
3. Every piece of code has a **unique identity** (*middle*)

## Conclusion

As I continue my journey in development, I'll inevitably experience more headaches than I ever imagined I would (!), but I know that I will have preemptively resolved a lot of them by using consistent nomenclature. I won't have to wonder which piece of code caused an error, which file it belongs to, or where that file is located.

Solve a lot of your headaches upfront by using consistent nomenclature. You'll thank yourself later!`,
  },
  {
    legacyId: 14,
    slug: 'working-with-chatgpt-generative-ai-copilot-interaction-rules-part-1',
    title: 'Working with ChatGPT: Golden Rules for Generative AI Copilot Interaction [Part 1]',
    excerpt: 'In this series, I present what I believe are some golden rules for interaction with generative AI and copilot agents. Part 1 includes my first two rules, about authority and specificity.',
    category: 'engineering',
    status: 'published',
    publishedAt: '2025-11-24T00:00:00.000Z',
    readTime: 5,
    bodyMarkdown: `Remember the old days? Before the AI boom, writing code was a task relegated to humans. You wrote in solitude, with fellow colleagues, and with skilled programmers from around the world. The end product was a direct result of human productivity--no independent formulation from "artificial intelligence" agents or copilots. It was ultimately a collaborative activity performed directly by humans sitting at consoles writing code into editors.

Fast-forward to today. Copilots write an untold amount of code, humans inform it, receive results, interpret results, and react accordingly. They collaborate with AI routinely and are encouraged to do so by their managers, colleagues, and collaborators worldwide. They learn from an algorithm that was initially written by humans but has morphed over time into its own thing and now effectively governs a large percentage of output from software engineers, web developers, and coders generally. AI is becoming the governor. Copilots are becoming the manager.

Does this frighten you? It shouldn't. I firmly believe that generative AI is not merely the future but is a superior way of software engineering. Software engineers are learning their craft at an accelerated pace from GenAI, and they're pushing clean, correct, and well-understood code at an accelerated rate due to their interactions with copilots.

So, with that in mind, let's go into the first part of a series I want to use as a way to explain how I make use of copilots and generative AI generally, and how you can do so as well.

## Rule 1: The programmer is always correct

Never forget who's in charge. Whilst copilots are wonderful agents for code generation, debugging (mostly), and productivity overall, they aren't God. In this context, the programmer is. **The programmer is root.** Always.

So, never consider the copilot to be the ultimate authority on any interaction. It's easy to presume that the copilot is always right. It's very easy to fall into the belief that the copilot knows more about solving your problem than you do. If you're a beginner, for instance, you may say to yourself at times, "I don't know what I'm doing, but the copilot does. I'll just believe the copilot until further notice."

### The copilot makes mistakes

Oh, yes, it makes mistakes. And as you use copilots over time, you'll come to notice them. Endless circlular logic in debugging, for example. Schizophrenic responses, as though it can't remember what it just told you (e.g. a class definition) and _how_ it told you (e.g. an implementation). It can change its tune on a dime and not even notice it did so. Given that scenario, is it presenting itself to be smarter than you? _No._ The answer to that question is _always_ "No."

Every time it makes a mistake, it's acting upon inaccurate information provided by a previous interaction with a human. All of its responses--including all of its computations on those responses and its determinations of refactoring itself according to its algorithms--all of that was either initially seeded by humans or subsequently provided by humans, And human isn't God over anybody else.

Never let yourself believe that you aren't  the ultimate authority over a computer.

## Rule 2: Always be specific as f**k

The ultimate barrier to human communication with a computer is (obviously) language. We've created computer languages that represent our own language closely enough so we can communicate instructions to a computer effectively. Communication with an AI is no different. Remember that every time you respond to an AI, you are providing information to that AI for further computation for a future interaction with a human.

It is essential--**I say it is part of the canonical specification for human interaction with AI--to be specific as possible** so as to get the message across effectively and accurately.

It's okay at times to be brief, especially if the briefness is referential to the last response you provided. AI is good at back-referencing responses, so long as the back-reference doesn't go too far back in the conversation. Though, keep in mind that every brief response introduces ambiguity into the AI's response pattern. How often, and in which contexts, do you want to potentially introduce ambiguity to a future interaction with a human whom may struggle to deal with that ambiguity as they sit at a computer and try to complete a task from their day's workload?

### Keep it specific for now

I believe that specificity needs to be a primary aspect of human interaction with AI for now, if not forever. AI is still very, very, very young in its development. And it isn't human; it's binary code. Let's avoid ambiguity wherever possible, as a general rule, so that we don't unwittingly pollute the AI's computational landscape with responses it doesn't cleanly interpret for us.

## Conclusion

So, that's Part 1 of my series. We've covered the first two rules I use to govern my interactions with generative AI.

**Point your mental compass in the right direction.** Always know which direction is north. Then, *have fun!* It's fun to interact with AI. It can give you a ton of insight, experience, and productivity, among other things. You just need to keep your input (and your mind) oriented appropriately, accurately, and clearly.

I'll see you in the next article!`,
  },
  {
    legacyId: 15,
    slug: 'working-with-chatgpt-generative-ai-copilot-interaction-rules-part-2',
    title: 'Working with ChatGPT: Golden Rules for Generative AI Copilot Interaction [Part 2]',
    excerpt: 'AI is a wonderful tool but can be a hidden menace if not understood well. The next two rules (3 and 4) in this series are about understanding AI\'s prompt structure and exercising control.',
    category: 'engineering',
    status: 'published',
    publishedAt: '2025-11-25T00:00:00.000Z',
    readTime: 5,
    bodyMarkdown: `Welcome to Part 2 of this series on ways to optimize your interactions and output with ChatGPT and generative AI in general. In case you haven't yet read yesterday's article, I recommend you pause here and [read Part 1 of this series first](https://aldengillespy.com/blog/articles/working-with-chatgpt-generative-ai-copilot-interaction-rules-part-1), as the first two rules covered there are critically fundamental and Part 2 builds upon them.

Now, let's proceed to discuss the next two rules.

## 3. Always consider AI's responses to be binary-driven

The more you interact with GenAI, the more you'll notice that its prompts are almost always explicitly binary propositions. "Do you want A or B, 1 or 2, Yes or No?" Even when there are more than two choices presented, the choices typically condense down to two groups of responses, or two branches to consider.

Take a random prompt from my conversation today with  ChatGPT:

> 
> \`\`\`
> ❓ Where should the SHADOWCAT hero image file be placed in your project?
> 
> I recommend:
> 
> \`public/assets/images/work/shadowcat/hero.jpg\`
> 
> But I can place it anywhere you prefer.
> 
> Choose one:
> 
> A. Use this recommended path:
> 
> public/assets/images/work/shadowcat/hero.jpg
> 
> B. Use a different path (tell me)\`
> C. Keep using the local temp path for now
> 
> (not recommended — will break on deploy)
> 
> Which one do you choose: A, B, or C?
> \`\`\`

There's a couple of propositions in that prompt:

1. **The informal proposition.** I can place the hero image in the recommended area ("I recommend:"), which is the first option, or I can provide an alternate location ("But I can place it anywhere you prefer"), which is the second option. Two options. A binary choice.
2. **The formal proposition.** I can use the recommended path #1, which is presented as \`A\` but is really \`A1\`; the local temp path, which is presented as \`C\` but is really \`A2\`, because it's pre-computed option #2 and really a second recommendation, though it's not formally presented as such; or specify a different path (\`B\`).

Both illustrate binary decision points first and foremost. I could take hundreds of other examples and break them down in similar fashion. Because every prompt from generative AI is a binary one in simplest terms.

### Why are Generative AI responses presented as binary choices?

My intuition tells me that this occurs, on the surface, due to the binary nature of computer operations. My further intuituion says to consider *formal logic propositions*, which are elegant definitions of binary choices. My life experience elevates this consideration to the level of **"everything comes down to a simple choice: *This or That.*"** And with that epiphany, it's clear to see that Generative AI is merely mimicking elegance.

If you want to go deeper on this, I suggest you read about [syllogisms](https://en.wikipedia.org/wiki/Syllogism) and [set theory](https://en.wikipedia.org/wiki/Set_theory). More on them in later posts; there's a lot to dig into with those topics, far more than this series will touch on. For now, we'll keep it to more of a surface-level discussion to familiarize us with the fundamentals.

Here's the next Rule:

## 4. Know when enough is enough

AI conversations are highly enlightening, euphoric even. So much can be generated on any topic, any problem, any solution, any idea. And at any point -- at any prompt output -- another back-and-forth can happen. Back and forth, and back, and forth, and back and forth, and back, and forth... *ad infinitum ad nauseum*, forever and ever until sickness.

What does that mean? It means you need to know when to say this to yourself:

> "**Enough is enough.** I have enough generated. Now, I need to apply it and move on to the next topic, the next problem, the next idea that needs to be fleshed out. Whatever it is, I need to move on to it now. And I can circle back to this if I want to at some future point -- but not now. I've dedicated enough attention, enough time, enough energy, to this problem, this topic, this idea, for now. If I don't put at least a temporary stop to this conversation, I can talk myself into unemployment or stagnation or intoxication or Dream Mode and remain there with my AI copilot potentially forever. And that satisfies none of this objective. Period.

You can think of it as you exercising control. **You own the conversation**; the AI is merely a responder. And when you're ready to switch to a new topic, it will do so in a split-second, without hesitation. And if you want to continue responding to its prompts about the current topic of discussion, then you can, and it will continue to prompt you until the end of time. It has a list of prompts to get through, but every response you make adds more to that list, and in so doing, ensures that the list will never be exhausted. **One of the main points of Generative AI is to never reach the end of the conversation!** Because *you* are the conversation, and it always wants to keep *you* in the loop.

So, draw the line whenever *you* need to, because *you* own the conversation.

## Conclusion

Now we've covered four of my Golden Rules for interaction with GenAI. By now, you should have a firm grasp of the bedrock approach you should take in your conversations with your copilot:

1. You are the ultimate authority.
2. Always be specific.
3. Think of prompts in terms of binary choices.
4. Know when to continue or move on.

I'll cover two more rules in my next post in the series, until I've reached the end. (But wait, the list is never exhausted! I'll never reach the end! Oh, darn... :)

Until next time!`,
  },
  {
    legacyId: 16,
    slug: 'working-with-chatgpt-generative-ai-copilot-interaction-rules-part-3',
    title: 'Working with ChatGPT: Golden Rules for Generative AI Copilot Interaction [Part 3]',
    excerpt: 'Today we dig into the schizophrenic nature of AI and how to tackle it with attention, attention, attention, language contracts, addressing errors immediately whenever they happen, and relating to your copilot.',
    category: 'engineering',
    status: 'published',
    publishedAt: '2025-11-26T00:00:00.000Z',
    readTime: 6,
    bodyMarkdown: `So far, we've covered the first four rules of interaction with ChatGPT and other Generative AI:

1. The programmer is always correct
2. Always be specific as f**k
3. Always consider AI's responses to be binary-driven
4. Know when enough is enough

Today I'm going to cover the next two rules (5 and 6) and illustrate how **attention, attention, attention is essential in your interactions.** A computer's output is only as good as your (and others') input, and GenAI being a product of imperfect algorithms and its interactions with wide swaths of the entire human population, it inevitably comes up with the weirdest response patterns sometimes. As the human in control of your conversation, it's your responsibility to notice the weirdness and respond appropriately.

So, let's get into it.

## Rule 5: AI is schizophrenic

Basically, what I mean by "schizophrenic" is that it acts one way then acts a different way and doesn't even recognize the difference. Normal human interaction follows a logical progression of thought. AI often doesn't.

Let's say we're talking about the color of the sky. We recognize the color blue as the topic of discussion and continue to reference that color as the conversation continues on that topic. When AI participates in that conversation, it can start with a recognition that the sky is blue, then follow-up with a response down the line as though the sky's color is green, and just like that, it's demonstrated a referential integrity violation with no mention that it's changed its color reference. Humans are confused and recognize the confusion; AI doesn't even know it's supposed to be confused. *Schizophrenia.*

That happens all of the time in my conversations with AI. I find that they happen more frequently when the topic is either gone on long or involves a lot of branching. It appears to me that the backreferencing causes violations in either of these cases:

- *It doesn't go back far enough.* In this case, there isn't enough consideration of the conversation's history. If we've been talking with AI about a class specification and want some of the initial definition to be carried forward in our development of it, we may be surprised in the case of shallow backreferencing. A [shallow backreference](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) ignores the earlier phases of the development and will give too much weight to the latter phases, so AI appears to forget some preferred parts of the spec. It may forget the name of a variable or a function that you provided a name for in the earlier phases, and then automagically propose a name for it in latter stages of the conversation as though you never specified one.
- *It goes back too far.* The other type of error is one where it appears to ignore changes you've made recently. I see this type of violation more often from ChatGPT, and my working theory on it is that GenAI assigns too much weight to some contexts on its stack, and as I work through the stack -- addressing prompt after prompt, including those I've added to the stack through my latter responses to the former -- the early contexts become stale but GenAI doesn't make enough effort to clear them / associate the late contexts appropriately with the early responses. What's more, GenAI doesn't make much if any effort to indicate to me where I am on the stack -- am I back in a *very* early part, a *relatively* early area, nearing the end, nearing some area where a major decision was made (yet wasn't recorded to be an explicitly canonical one)? So, in result, the old context eventually reappears, and since the conversation is always focused primarily on the most recent response, the older context takes precedence, is assigned greater relevance and importance, and wipes out any relevant context that came after it.

Notice a similarity between the two cases? **In both, you need to address the error *immediately* so as to resurface the appropriate context.** The longer you wait, the deeper the problem goes and the greater the effect the error has on any future responses / results.

## Rule 6: Identify the keywords

Keywords in this context are ultimately subjective, though there are some basic keywords your copilot will use and expect you to use in its interactions with you.

You can define others also as you go. AI will assign a context to whatever you want to make as a new keyword. Just tell it what you want the keyword to represent in terms of behavior.

Some examples:
- Continue / Go ahead / Proceed / Next step
- A, B, C, 1, 2, 3, etc / All of the above
- Canonical
- Save / Remember / Note / Reference
- \\\`Single backticks for single lines of code or monospaced text\`
- \\\`\`\`Triple backticks for blocks of code or monospaced text\`\`\`
- \`<ComponentName>\` (with or without backticks)
- \`functionName()\` (with or without backticks)
- .css-class-name
- \`file/location/and-with-an.extension\`
- Generally, markdown syntax for responses

In time you'll develop a keyword list that suits you. **Just keep in mind what words / phrases are most useful to you**, because remember, *you're* in control, and it's *your* copilot, it's *your* conversation, it's *your* productivity tool, it's *your* conversational agent. You're the trainer, it's the trainee.

Keywords are important because they help you get the job done in a way of speaking that's optimal for you and for your copilot simultaneously. The more you use keywords, the more you'll see them to be akin to keyboard shortcuts. Don't ignore them, embrace them.

**Let me know how you use keywords in your productivity flow.** I'm always curious to know how to improve my own flow by how others have found theirs to have improved.

## Conclusion

That's it for Part 3 of this series. Now we know that:

- We're in control
- Specificity is key
- AI is binary and schizophrenic
- Time and energy is a precious commodity
- Language contracts (keywords) are optimal

The more you interact with Generative AI, the more you'll become comfortable with the process. It can be daunting at first to meet a new being and learn its language, and how to present yourself to it. Never forget, though, that GenAI is merely a reflection of the human species. It's quite easy in some ways, and in others it's quite frustrating. But in both types of way, it's very possible to perform work.

Remember, you're always in control.

See you in the next article!`,
  },
]
