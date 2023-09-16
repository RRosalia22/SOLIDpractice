enum MembershipType {
    Basic = "Basic",
    Premium = "Premium",
    Platinum = "Platinum",
}

enum BookCategory {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Reference = "Reference",
}

class Book {
    private dueDate: Date | undefined;
    private returnDate: Date | undefined;

    constructor(public title: string, public author: string, public isLoaded: boolean = false, public category: BookCategory) {}

    borrowBook() {
        if (!this.dueDate) {
            const currentDate = new Date();
            this.dueDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        }
    }

    calculateFine(): number {
        if (!this.returnDate || !this.dueDate) {
            return 0;
        }

        const daysLate = Math.max(0, Math.ceil((this.returnDate.getTime() - this.dueDate.getTime()) / (1000 * 60 * 60 * 24)));
        return daysLate * 1;
    }

    returnBook() {
        this.returnDate = new Date();
    }
}

class User {
    private borrowHistory: Map<string, Book[]> = new Map();

    constructor(public userID: string, public name: string, public membership: MembershipType) {}

    addToBorrowHistory(book: Book) {
        if (!this.borrowHistory.has(book.title)) {
            this.borrowHistory.set(book.title, []);
        }
        this.borrowHistory.get(book.title)?.push(book);
    }

    getBorrowedBooks(): Book[] {
        const borrowedBooks: Book[] = [];
        for (const books of this.borrowHistory.values()) {
            borrowedBooks.push(...books);
        }
        return borrowedBooks;
    }
}

interface ILogger {
    log(message: string): void;
}

class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(message);
    }
}

interface ILoadManager {
    loadBook(book: Book, user: User): void;
    returnBook(book: Book, user: User): void;
}

interface ILoggable {
    log(message: string): void;
}

class Library implements ILoadManager, ILoggable {
    private books: Book[] = [];
    private loadBooks: Map<string, User> = new Map();

    constructor(
        private logger: ILogger,
        private errorLogger: ILogger,
        private infoLogger: ILogger,
        private warningLogger: ILogger
    ) {}

    log(message: string): void {
        this.logger.log(message);
    }

    loadBook(book: Book, user: User) {
        if (book.isLoaded) {
            this.errorLogger.log('Book is already loaded');
            return;
        }

        if (book.category === BookCategory.Reference) {
            this.errorLogger.log('Reference books cannot be borrowed.');
            return;
        }

        if (user.membership === MembershipType.Basic && user.getBorrowedBooks().length >= 2) {
            this.errorLogger.log('Basic members can only borrow 2 books at a time.');
            return;
        }

        if (user.membership === MembershipType.Premium && user.getBorrowedBooks().length >= 5) {
            this.errorLogger.log('Premium members can only borrow 5 books at a time.');
            return;
        }

        book.borrowBook();
        this.loadBooks.set(book.title, user);
        book.isLoaded = true;
        user.addToBorrowHistory(book);
        this.infoLogger.log(`${user.name} (id: ${user.userID}) has borrowed ${book.title}.`);
    }

    returnBook(book: Book, user: User): void {
        if (!book.isLoaded) {
            this.errorLogger.log('Book is not loaded');
            return;
        }

        const borrowedUser = this.loadBooks.get(book.title);
        if (borrowedUser && borrowedUser.userID === user.userID) {
            book.returnBook();
            const fineAmount = book.calculateFine();
            if (fineAmount > 0) {
                this.errorLogger.log(`Book returned late. ${fineAmount} dollar(s) fine generated.`);
            }
            this.loadBooks.delete(book.title);
            book.isLoaded = false;
            this.infoLogger.log(`${book.title} has been returned by ${user.name} (id: ${user.userID})`);
        } else {
            this.errorLogger.log(`Book can only be returned by the borrower (${user.name})`);
        }
    }

    addBook(book: Book) {
        this.logger.log('Adding a book...');
        this.books.push(book);
        this.logger.log(`Book "${book.title}" added successfully.`);
    }

    findBookByTitle(title: string): Book | undefined {
        const foundBook = this.books.find((book) => book.title === title);
        if (!foundBook) {
            this.warningLogger.log("Book not found");
        }
        return foundBook;
    }
}
