# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seed.spec.ts >> Toolshop application smoke and regression scenarios >> contact form validates required fields and accepts a text attachment
- Location: Automationframework\tests\seed.spec.ts:61:7

# Error details

```
Error: locator.fill: Error: Element is not an <input>, <textarea> or [contenteditable] element
Call log:
  - waiting for getByLabel('Subject')
    - locator resolved to <select id="subject" data-test="subject" formcontrolname="subject" class="form-select ng-untouched ng-pristine ng-invalid">…</select>
    - fill("Return")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

# Page snapshot

```yaml
- generic [ref=f2e2]:
  - generic [ref=f2e3]:
    - text: View the
    - link "Documentation" [ref=f2e4] [cursor=pointer]:
      - /url: https://testsmith-io.github.io/practice-software-testing/#/
    - text: for this application.
  - generic [ref=f2e5]:
    - generic [ref=f2e7]:
      - generic [ref=f2e8]: Practice Black Box Testing & Bug Hunting
      - button "Testing Guide" [ref=f2e9] [cursor=pointer]
      - button "🐛 Bug Hunting" [ref=f2e10] [cursor=pointer]
    - navigation [ref=f2e11]:
      - generic [ref=f2e12]:
        - link "Practice Software Testing - Toolshop" [ref=f2e13] [cursor=pointer]:
          - /url: /
        - generic [ref=f2e32]:
          - menubar "Main menu" [ref=f2e33]:
            - menuitem [ref=f2e34]:
              - link "Home" [ref=f2e35] [cursor=pointer]:
                - /url: /
            - menuitem [ref=f2e36]:
              - button "Categories" [ref=f2e37] [cursor=pointer]
            - menuitem [ref=f2e38]:
              - link "Contact" [ref=f2e39] [cursor=pointer]:
                - /url: /contact
            - menuitem [ref=f2e40]:
              - link "Sign in" [ref=f2e41] [cursor=pointer]:
                - /url: /auth/login
          - button "Select language" [ref=f2e43] [cursor=pointer]: EN
  - generic [ref=f2e51]:
    - heading "Contact" [level=3] [ref=f2e52]
    - generic [ref=f2e54]:
      - generic [ref=f2e55]:
        - generic [ref=f2e57]:
          - generic [ref=f2e58]: First name
          - textbox "First name" [ref=f2e59]:
            - /placeholder: Your first name *
            - text: test123
        - generic [ref=f2e61]:
          - generic [ref=f2e62]: Last name
          - textbox "Last name" [ref=f2e63]:
            - /placeholder: Your last name *
            - text: test
        - generic [ref=f2e64]:
          - generic [ref=f2e65]: Email address
          - textbox "Email address" [active] [ref=f2e66]:
            - /placeholder: Your email *
            - text: test@gmail.com
      - generic [ref=f2e67]:
        - generic [ref=f2e69]:
          - generic [ref=f2e70]: Subject
          - combobox "Subject" [ref=f2e71]:
            - option "Customer service"
            - option "Webmaster"
            - option "Return"
            - option "Payments"
            - option "Warranty"
            - option "Status of my order"
        - generic [ref=f2e72]:
          - generic [ref=f2e73]: Message *
          - textbox "Message *" [ref=f2e75]
        - generic [ref=f2e76]:
          - generic [ref=f2e77]: Attachment
          - generic [ref=f2e78]:
            - button "Attachment" [ref=f2e79] [cursor=pointer]
            - generic [ref=f2e80]:
              - text: Only files with the
              - strong [ref=f2e81]: txt
              - text: extension are allowed, and files must be 0kb.
        - button "Send" [ref=f2e83] [cursor=pointer]
  - contentinfo [ref=f2e85]:
    - generic [ref=f2e86]:
      - text: This is a DEMO application (
      - link "GitHub repo" [ref=f2e87] [cursor=pointer]:
        - /url: https://github.com/testsmith-io/practice-software-testing
      - text: ), used for software testing training purpose. |
      - link "Privacy Policy" [ref=f2e88] [cursor=pointer]:
        - /url: /privacy
      - text: "| Banner photo by"
      - link "Barn Images" [ref=f2e89] [cursor=pointer]:
        - /url: https://unsplash.com/@barnimages
      - text: "on"
      - link "Unsplash" [ref=f2e90] [cursor=pointer]:
        - /url: https://unsplash.com/photos/t5YUoHW6zRo
      - text: .
    - generic [ref=f2e91]: v2.4 | Built 2026-08-21 | Angular 20.0.5
  - button "Open chat" [ref=f2e93] [cursor=pointer]
  - button "Show live shop activity" [ref=f2e97] [cursor=pointer]
```

# Test source

```ts
  1  | import type { Locator } from '@playwright/test';
  2  | import BasePage from './base.page';
  3  | 
  4  | export class ContactPage extends BasePage {
  5  |   readonly firstName = this.page.getByLabel('First name');
  6  |   readonly lastName = this.page.getByLabel('Last name');
  7  |   readonly email = this.page.getByLabel('Email address');
  8  |   readonly subject = this.page.getByLabel('Subject');
  9  |   readonly message = this.page.getByLabel('Message');
  10 |   readonly attachment: Locator = this.page.locator('input[type="file"]');
  11 |   readonly sendButton = this.page.getByRole('button', { name: 'Send' });
  12 | 
  13 |   async open() {
  14 |     await this.navigateTo('/contact');
  15 |     await this.waitForPageLoad();
  16 |   }
  17 | 
  18 |   async fillForm(
  19 |     firstName: string,
  20 |     lastName: string,
  21 |     email: string,
  22 |     subject: string,
  23 |     message: string,
  24 |   ) {
  25 |     await this.firstName.fill(firstName);
  26 |     await this.lastName.fill(lastName);
  27 |     await this.email.fill(email);
> 28 |     await this.subject.fill(subject);
     |                        ^ Error: locator.fill: Error: Element is not an <input>, <textarea> or [contenteditable] element
  29 |     await this.message.fill(message);
  30 |   }
  31 | 
  32 |   async uploadAttachment(filePath: string | string[]) {
  33 |     await this.uploadFile(this.attachment, filePath);
  34 |   }
  35 | }
  36 | 
```