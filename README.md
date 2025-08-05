# Library

Assignment

1. All of your book objects are going to be stored in an array, so you’ll need a constructor for books. Then, add a separate function to the script (not inside the constructor) that can take some arguments, create a book from those arguments, and store the new book object into an array. Also, all of your book objects should have a unique id, which can be generated using crypto.randomUUID(). This ensures each book has a unique and stable identifier, preventing issues when books are removed or rearranged.

2. Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.

3. Add a “New Book” button that brings up a form allowing users to input the details for the new book and add it to the library: author, title, number of pages, whether it’s been read and anything else you might want. How you decide to display this form is up to you. For example, you may wish to have a form show in a sidebar or you may wish to explore dialogs and modals using the <dialog> tag. However you do this, you will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. This is where event.preventDefault(); will come in handy. Check out the documentation for event.preventDefault and see how you can solve this issue!

4. Add a button on each book’s display to remove the book from the library.

5. Add a button on each book’s display to change its read status.
