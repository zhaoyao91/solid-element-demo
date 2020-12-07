import { createEffect, createSignal, onCleanup, onMount, Show } from 'solid-js';

export const App = () => {
  const [showTimer, setShowTimer] = createSignal(true);
  const [count, setCount] = createSignal(0);
  const timer = setInterval(() => setCount(count() + 1), 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <>
      <div>
        <button onClick={() => setShowTimer(!showTimer())}>toggle</button>
        <Status show={showTimer()} />
        <Show when={showTimer()}>
          <Timer count={count()} />
        </Show>
      </div>
    </>
  );
};

const Timer = (props: { count: number }) => {
  onMount(() => {
    console.log('mount timer');
  });

  onCleanup(() => {
    console.log('unmount timer');
  });

  createEffect(() => {
    console.log('...', props.count);
  });

  return (
    <div>
      <span>{props.count}</span>
    </div>
  );
};

const Status = (props: { show: boolean }) => {
  return <p>show: {String(props.show)}</p>;
};
