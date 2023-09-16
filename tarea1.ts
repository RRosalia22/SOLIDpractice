class Book {
    private dueDate: Date | undefined; // Nueva propiedad para la fecha de devolución
    private returnDate: Date | undefined; // Nueva propiedad para la fecha de devolución real

    constructor(public title: string, public author: string, public isLoaded: boolean = false) {}

    // Método para registrar la fecha de préstamo
    borrowBook() {
        if (!this.dueDate) {
            const currentDate = new Date();
            this.dueDate = new Date(currentDate.setDate(currentDate.getDate() + 7)); // 7 días de préstamo estándar
        }
    }

    // Método para calcular si el libro está vencido y generar multa
    calculateFine(): number {
        if (!this.returnDate || !this.dueDate) {
            return 0; // No hay fecha de devolución o fecha de préstamo
        }

        const daysLate = Math.max(0, Math.ceil((this.returnDate.getTime() - this.dueDate.getTime()) / (1000 * 60 * 60 * 24)));
        return daysLate * 1; // $1 de multa por cada día de retraso
    }

    // Método para devolver el libro
    returnBook() {
        this.returnDate = new Date();
    }
}

class User {
    constructor(public userID: string, public name: string) {}
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
        book.borrowBook(); // Registrar la fecha de préstamo
        this.loadBooks.set(book.title, user);
        book.isLoaded = true;
        this.infoLogger.log(`${user.name} (id: ${user.userID}) has borrowed ${book.title}.`);
    }

    returnBook(book: Book, user: User): void {
        if (!book.isLoaded) {
            this.errorLogger.log('Book is not loaded');
            return;
        }

        const borrowedUser = this.loadBooks.get(book.title);
        if (borrowedUser && borrowedUser.userID === user.userID) {
            book.returnBook(); // Registrar la fecha de devolución real
            const fineAmount = book.calculateFine(); // Calcular multa
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
