# Nova Fori Front-end Tech Test

*How long did you spend?*

Around 3.5 - 4hrs. I've been trying different scaffolding tools and decided to
use Vite for the first time as I've been waiting to try it out. I didn't realise
Jet wouldn't work out of the box with Vite, so I had to spend some time setting
up tests. On the plus side, performace looks great and I'd use it again. 

*How do you build and run?*

```
npm install
npm run build
```

This builds a `/dist` directory containing the compiled JS and CSS. However, for
viewing the code I'd use;

```
npm run dev
```

I use Volta for Node versioning. The version is specified in `package.json` file.- 

*What technical and functional assumptions did you make when implementing your
solution?*

- I've tried to keep the data/state out of the todo list so this could be further
refactored to use a store or API request. 
- I expected to have separate components for the list, the form to add a new task, and
the task itself. Generally I start in a single file, test-driven, and then break
out into components as I go.
- I assumed the tasks would have no ID as they aren't coming from an API, so I
  have a crude implementation of a unique ID.

*Briefly explain your technical design and why do you think is the best
approach to this problem.*

Being candid, it's not the best solution. I've worked in fairly strict TDD
cycles, the decent code would come after this step; it's functional but I
believe all of the task logic needs abstracting into a custom hook. I do like
the approach of writing test-first as I will be able to refactor the code with
much more confidence.

*If you were unable to complete any user stories, outline why and how would
you have liked to implement them.*

I believe I completed the stories but there are plenty of improvements I'd be
making with a little more time;

- I didn't touch styling. I had styled components set up but didn't get
  around to using them.
- I'd create a custom hook for the task logic and move most of the logic out of
  the main App component.
- I probably bite off more than I could chew with trying Vite for the first
  time. I could have saved some time and used Create React App for the setup,
  but I'm also impressed with the testing abilities of Vite / vitest.

My closing thoughts would be; this may not be enough to show front-end ability
depending on what you're looking for. I am willing to polish this code up
depending on the thoughts of the team. Thanks! 


  



