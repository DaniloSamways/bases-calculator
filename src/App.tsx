import { useState } from 'react';
import './App.css'
import { Selection } from './components/Selection/selection';
import { decimalToBase } from './utils/decimalToBase';

type convertionProps = {
  result: string | number;
  resolution: string;
}

export type basesType = 'Decimal' | 'Binário' | 'Octal' | 'Hexadecimal';

function App() {
  const [initialBase, setInitialBase] = useState<basesType>('Decimal');
  const [finalBase, setFinalBase] = useState<basesType>('Binário');
  const [value, setValue] = useState<string | number>('');

  const [convertion, setConvertion] = useState<convertionProps>({ result: '', resolution: '' });

  const handleConvert = () => {
    if (!value) return;
    let response = {} as convertionProps;
    switch (initialBase) {
      case 'Decimal':
        response = decimalToBase(value, finalBase);
        break;
    }

    setConvertion(response);
  }

  return (
    <main>
      <h2>Selecione as bases para converter</h2>

      <form onSubmit={(event) => event.preventDefault()}>
        <div className="selections">
          <Selection
            base={initialBase}
            setBase={setInitialBase}
            otherBase={finalBase}
          />
          <span className="divider">para</span>
          <Selection
            base={finalBase}
            setBase={setFinalBase}
            otherBase={initialBase}
          />
        </div>

        <div className="insertion">
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            type="text"
            placeholder="Valor a converter"
          />
          <button onClick={handleConvert}>Converter</button>
        </div>
      </form>

      <pre>
        <h3>RESOLUÇÃO</h3>
        <p>{convertion.resolution}</p>
        <div><span>RESULTADO:</span> {convertion.result}</div>
      </pre>
    </main>
  )
}

export default App
