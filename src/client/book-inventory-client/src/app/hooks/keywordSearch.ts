import useSWRMutation from "swr/mutation";

export function useSearchKeyword() {
  async function sendRequest(url: string, { arg }: { arg: { title: string } }) {
    return fetch(`${url}?title=${arg.title}`).then((res) => res.json());
  }

  const { trigger, data } = useSWRMutation(
    `http://localhost:8080/book`,
    // `${process.env.BASE_API_URL}/book`, //TODO: 読み込むようにする
    sendRequest /* options */
  );

  return {
    trigger,
    data,
  };
}
