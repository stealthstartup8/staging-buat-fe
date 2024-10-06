This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Notes:
On the explanation below, section refers to the template, and component refers to the components inside the template

## Public Folder
#### Assets like images, videos, and gifs.
    .
    ├── assets            # to store assets used in components and pages
    ├── imagesBlog        # to store assets used in blog templates
    ├── imagesFAQ         # to store assets used in faq templates
    ├── imagesFooter      # to store assets used in footer templates
    ├── imagesForm        # to store assets used in form templates
    ├── imagesNavbar      # to store assets used in navbar templates
    ├── imagesTemplate    #
    ├── img               #
    ├── pages             #
    ├── posts             #

## Store Folder
#### Redux slices.
    .
    ├── blog-and-product          # blog slices
    ├── body                      # body slices
    ├── e-commerce.js             
    ├── footer                    # footer slices
    ├── footer.js                 
    ├── forms.js                  
    ├── job-vacancy.js            
    ├── menu                      # menu slices
    ├── navbar.js                 
    ├── pricing.js                
    ├── sections.js               
    ├── selectSection.js          
    ├── store.js                  
    └── style-management.js       

## Src Folder
#### Building blocks of the website.
    ├── components
    │   ├── Elements              # atomic components used in several different places
    │   ├── Fragments
    │   │   ├── Blocker
    │   │   │   └── index.js
    │   │   ├── Blog
    │   │   │   ├── form-contentOne.js
    │   │   │   └── form-contentTwo.js
    │   │   ├── Blog-and-Product
    │   │   │   ├── ContentManagement
    │   │   │   │   ├── body
    │   │   │   │   │   ├── background.js
    │   │   │   │   │   ├── index.js
    │   │   │   │   │   └── menu.js
    │   │   │   │   └── index.js
    │   │   │   └── SectionSelection
    │   │   │       ├── index.js
    │   │   │       └── menu.js
    │   │   ├── Card
    │   │   │   ├── PagesCard
    │   │   │   │   ├── ActionPopup
    │   │   │   │   │   ├── delete.js
    │   │   │   │   │   ├── edit.js
    │   │   │   │   │   └── reset.js
    │   │   │   │   └── index.js
    │   │   │   └── postsCard.js
    │   │   ├── Details
    │   │   │   ├── ContentManagement           # manage section contents, grouped by template
    │   │   │   │   ├── body
    │   │   │   │   │   ├── Section.module.css
    │   │   │   │   │   ├── background.js
    │   │   │   │   │   ├── blog
    │   │   │   │   │   │   ├── blogLabel.js
    │   │   │   │   │   │   └── index.js
    │   │   │   │   │   ├── button.js
    │   │   │   │   │   ├── career
    │   │   │   │   │   │   ├── label.js
    │   │   │   │   │   │   └── menu.js
    │   │   │   │   │   ├── category.js
    │   │   │   │   │   ├── commerce
    │   │   │   │   │   │   ├── card.js
    │   │   │   │   │   │   ├── category.js
    │   │   │   │   │   │   ├── menu.js
    │   │   │   │   │   │   └── shop-modal.js
    │   │   │   │   │   ├── cta
    │   │   │   │   │   │   └── menu.js
    │   │   │   │   │   ├── faq
    │   │   │   │   │   │   ├── faq.js
    │   │   │   │   │   │   └── menu.js
    │   │   │   │   │   ├── font.js
    │   │   │   │   │   ├── form
    │   │   │   │   │   │   ├── forms.js
    │   │   │   │   │   │   └── index.js
    │   │   │   │   │   ├── logo
    │   │   │   │   │   │   ├── logo.js
    │   │   │   │   │   │   └── menu.js
    │   │   │   │   │   ├── pricing
    │   │   │   │   │   │   ├── menu.js
    │   │   │   │   │   │   └── package.js
    │   │   │   │   │   └── sections
    │   │   │   │   │       ├── label.js
    │   │   │   │   │       └── menu.js
    │   │   │   │   ├── footers
    │   │   │   │   │   ├── company.js
    │   │   │   │   │   ├── font.js
    │   │   │   │   │   ├── information.js
    │   │   │   │   │   ├── menu.js
    │   │   │   │   │   ├── navigation.js
    │   │   │   │   │   └── social.js
    │   │   │   │   └── menus
    │   │   │   │       ├── button.js
    │   │   │   │       ├── font.js
    │   │   │   │       ├── logo.js
    │   │   │   │       ├── menu.js
    │   │   │   │       └── navigation.js
    │   │   │   ├── SectionSelection            # display all template to be drag and dropped
    │   │   │   └── templateMapping.js
    │   │   ├── Form
    │   │   │   ├── createWebsite.js
    │   │   │   ├── loginForm.js
    │   │   │   └── registerForm.js
    │   │   ├── OperationButton
    │   │   │   └── index.js
    │   │   ├── Popup
    │   │   │   ├── ForgotPassword
    │   │   │   │   ├── resetPassword.js
    │   │   │   │   ├── success.js
    │   │   │   │   └── verifyPin.js
    │   │   │   ├── Forms
    │   │   │   │   ├── create.js
    │   │   │   │   ├── details.js
    │   │   │   │   └── edit.js
    │   │   │   ├── Profile
    │   │   │   │   ├── success.js
    │   │   │   │   ├── updatePassword.js
    │   │   │   │   └── updatePin.js
    │   │   │   ├── confirmation.js
    │   │   │   ├── delete.js
    │   │   │   └── job-vacancy
    │   │   │       └── index.js
    │   │   ├── Preview                 # website's preview template grouped by template category
    │   │   │   ├── Blog                # blog templates
    │   │   │   ├── BlogDetails         #
    │   │   │   ├── CTA                 # CTA templates
    │   │   │   ├── Career              # career templates
    │   │   │   ├── Commerce            # commerce templates
    │   │   │   ├── FAQ                 # FAQ templates
    │   │   │   ├── Footer              # footer templates
    │   │   │   ├── Forms               # form templates
    │   │   │   ├── Logo                # logo templates
    │   │   │   ├── Navbar              # navbar templates
    │   │   │   ├── Pricing             # pricing templates
    │   │   │   ├── Section             # hero templates (dont have the time to rename the folder)
    │   │   │   └── index.js            # exports all preview templates
    │   │   ├── StyleManagement         # map each templates to its menu and management section
    │   │   ├── TemplatePreview         #
    │   │   ├── mainHeader.js           # main header for the home page
    │   │   ├── navbar.js               # navbar for the
    │   │   ├── sidebar.js              # sidebar for the home page
    │   │   └── sortingButton.js        # button for switching between selected sections and components
    │   ├── Layouts
    │   │   ├── loginRegisterLayouts.js
    │   │   ├── mainLayouts.js
    │   │   └── secondaryLayout.js
    │   └── Portals                     # portal components for modals
    ├── pages                      # all pages on the website
    │   ├── _app.js
    │   ├── _document.js
    │   ├── _settings.js
    │   ├── admin.js
    │   ├── api                    # api
    │   ├── blog
    │   │   ├── create.js          # page for creating a blog
    │   │   └── detail             # page for editing blog detail
    │   ├── checkmodals.js
    │   ├── domain.js
    │   ├── e-commerce
    │   │   ├── create.js          # page for adding a commerce product
    │   │   └── index.js           # page for showing all commerce product
    │   ├── form.js
    │   ├── index.js
    │   ├── job-vacancy
    │   │   ├── create.js          # page for adding a job
    │   │   ├── detail
    │   │   │   └── [id].js
    │   │   └── index.js           # page for showing all career jobs
    │   ├── login.js               # login page
    │   ├── pages-detail
    │   │   ├── [id].js
    │   │   └── blog-and-product
    │   │       └── [id].js
    │   ├── posts.js               # page for showing all blogs posted
    │   ├── preview-website
    │   │   └── [id].js
    │   ├── pricing
    │   │   ├── create.js          # page for adding a pricing product
    │   │   ├── detail             # page for editing pricing detail
    │   │   └── index.js           # page for showing all pricing product
    │   ├── profile.js             # profile page
    │   ├── register.js            # page for registration
    │   └── settings.js            # page for setting the website
    ├── styles                     # styles that can't be defined with inline styling
    │   └── globals.css            # styles available for global use
    └── utils                      # utility functions
        ├── api                    # save mechanism for body, navbar, and footer templates
        ├── constants
        │   ├── FontSize.js        # define the font sizes used by label, headline, and tagline
        │   ├── Shapes.js          # define the label shapes
        │   └── index.js           # import all preview templates and assign them each to corresponding category id, also to array grouped based on their template.
        ├── helpers                # helper functions used in different part of the program
        │   ├── ClassName.js       #
        │   ├── HTMLParse.js       # functions related to html parsing such as sanitizing html text for extra security.
        │   └── ZoomPan.js         # website view size controller
        └── hooks
            ├── blog-and-product      #
            │   ├── useBlogMenu.js    #
            │   └── useBlogStyle.js   #
            ├── useBody.js            #
            ├── useColorPicker.js     # handles the open and close state of a color picker modal
            ├── useFooter.js          #
            ├── useForm.js            #
            ├── useNavbar.js          #
            ├── usePagesCard.js       #
            ├── usePassword.js        #
            ├── useProfile.js         #
            ├── useStyleManagement.js # handles the selection of section and components
            ├── useTemplate.js        # handles the drag and drop mechanism
            └── useWebsite.js         # handles updates of the website metadata
