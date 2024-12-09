# 3DPrinters
Работа с fetch api, setIntercval, callback-функциями, фреймворк vue, ts, vitest, json-server


# Запуск проекта:

npm install<br>
npx json-server db.json<br>
npm run dev<br>

# Запуск тестов:

npm run test

# Суть проекта:

Сделать интерфейс, в котором реализован запуск печати принтера. При начале печати, высвечивается процент создания фигурки из очереди. У принтера есть очередь фигурок. Принрер имеет свойство "Скорость печати".<br>
Также принтеру необходимо задать катушку(см далее).


Принтер:<br>
Имеет поля isPrinting, говорящий нам о том, что принтер находится в печати, printSpeed - скорость печати(см/c), заданаая катушка(coil), а также очередь фигур(Figure[])<br>

Катушка:<br>

Имеет поля printerId(привязка к принтеру), длина катушки(меняется на скорость печати раз в секунду) и ее цвет.<br>

Фигурки:<br>

Имеет поля printerId(привязка к принтеру), периметр(как бы длина фигурки, от нее будет вычитаться скорость печати раз в секунду).


