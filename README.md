Ссылка на задание -
Дата дедлайна. - 13.06.06 02.59 (ala)
Score: 320 / 320

# file-manager

## Technical requirements - fulfilled

- No external dependencies should be required
  - satisfied
- The program is started by npm-script start in following way: npm run start -- --username=your_username
  - fulfilled
- After starting the program displays the following text in the console: Welcome to the File Manager, Username!
  - implemented
- After program work finished (ctrl + c pressed or user sent .exit command into console) the program displays the following text in the console: Thank you for using File Manager, Username!
  - implemented
- At the start of the program and after each end of input/operation current working directory should be printed in following way: You are currently in path_to_working_directory (except error messages as it was shown during [Task 1 Review, Task 2 Issuance STREAM](<[https://pages.github.com/](https://www.youtube.com/watch?v=TmylgGP9QDk&t=2569s&ab_channel=RollingScopesSchool)>)
  - implemented
- Starting working directory is current user's home directory (for example, on Windows it's something like system_drive/Users/username)
  - executed
- By default program should prompt user in console to print commands and wait for results
  - executed
- In case of unknown operation or invalid input Invalid input message should be shown and user should be able to enter another command
  - implemented
- In case of error during execution of operation Operation failed message should be shown and user user should be able to enter another command
  - implemented
- Attempt to perform an operation on a non-existent file or work on a non-existent path should result in the operation fail
  - implemented
- User can't go upper than root directory (e.g. on Windows it's current local drive root). If user tries to do so, current working directory doesn't change
  - implemented

## List of operations and output:

### Navigation & working directory (nwd)

> npm run start -- --username=Alex
> Welcome to the File Manager, Alex!
> You are currently in C:\Users\alexa
> up
> You are currently in C:\Users
> up
> You are currently in C:\
> up
> You are currently in C:\
> cd User
> Operation failed
> cd Users
> You are currently in C:\Users
> cd ..
> You are currently in C:\
> cd C:\Users
> You are currently in C:\Users
> ls
> [
> > 'alexa',
> > 'All Users',
> > 'Default',
> > 'Default User',
> > 'desktop.ini',
> > 'Public',
> > 'Все пользователи'
> > ]
> You are currently in C:\Users

---

REMARK
I have created a file: **123.txt** with following texh
1
22
333
4444
!

---

### Basic operations with files // Для системных папок тебуется доп. адм доступ, поэтому тестируем в папке пользователя

> cat 123.txt
> Operation failed
> cd alexa
> You are currently in C:\Users\alexa
> cat 123.txt
> 1
> 22
> 333
> 4444
> !
> You are currently in C:\Users\alexa
> ls
> [
> > ...
> > '123.txt',
> > '124.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa
> add 124.txt // Как следовало из комментария Максима create не обязательно реализовывать через стримы
> Operation failed
> add 125.txt
> You are currently in C:\Users\alexa
> ls
> [
> > ...
> > '123.txt',
> > '124.txt',
> > '125.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa
> rn 125.txt 126.txt
> You are currently in C:\Users\alexa
> ls
> [
> > ...
> > '123.txt',
> > '124.txt',
> > '126.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa
> cp 126.txt ./Documents
> You are currently in C:\Users\alexa
> cd documents
> You are currently in C:\Users\alexa\documents
> ls
> [
> > ...
> > '126.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa\documents
> ls
> [
> > ...
> > '123.txt',
> > '124.txt',
> > '126.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa
> mv 124.txt documents
> You are currently in C:\Users\alexa
> ls
> [
> > ...
> > '123.txt',
> > '126.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa
> cd documents
> You are currently in C:\Users\alexa\documents
> ls
> [
> > ...
> > '124.txt',
> > '126.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa\documents
> ls
> [
> > ...
> > '124.txt',
> > '126.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa\documents
> rm 126.txt
> You are currently in C:\Users\alexa\documents
> ls
> [
> > ...
> > '124.txt',
> > ...
> > ]
> You are currently in C:\Users\alexa\documents

### Operating system info (prints following information in console)

> os --EOL
> "\r\n"
> You are currently in C:\Users\alexa
> os --cpus
> {
> amount_of_CPUs: 20,
> model: '12th Gen Intel(R) Core(TM) i7-12700KF',
> clock_rate: [

    3.61, 3.61, 3.61, 3.61,
    3.61, 3.61, 3.61, 3.61,
    3.61, 3.61, 3.61, 3.61,
    3.61, 3.61, 3.61, 3.61,
    3.61, 3.61, 3.61, 3.61

]
}
You are currently in C:\Users\alexa

> os --homedir
> C:\Users\alexa
> You are currently in C:\Users\alexa
> os --username
> alexa
> You are currently in C:\Users\alexa
> os --architecture
> x64
> You are currently in C:\Users\alexa

### Hash calculation

> hash 123.txt
> 0488c11f3038d30d9b16af60d8f554de7a281d9c745694b5eb6dd4dd0e9a9165
> You are currently in C:\Users\alexa
> cat 123.txt // записываем 1 в конце и проверяем
> 1
> 22
> 333
> 4444
> !
> 1
> You are currently in C:\Users\alexa
> hash 123.txt
> 2a7f32fdbba57bb6bf813b12aeaecf7faf9b81c1eab6eb121ca7578ca34752c3
> You are currently in C:\Users\alexa

### Compress and decompress operations

> compress 123.txt 123.txt.gs
> You are currently in C:\Users\alexa
> decompress 123.txt.gz /documents/123.txt
> You are currently in C:\Users\alexa
