import useSWRMutation from "swr/mutation";
import { convert } from "../api/converter/searchKeywordConverter";
import useSWR from "swr";

export function useSearchKeyword() {
  async function sendRequest(url: string, { arg }: { arg: { title: string } }) {
    return fetch(`${url}?title=${arg.title}`).then((res) => res.json());
  }

  const { trigger, data } = useSWRMutation(
    `http://localhost:8080/book`,
    // `${process.env.BASE_API_URL}/book`, //TODO: 読み込むようにする
    sendRequest /* options */
  );

  const viewModel = convert(data);

  return {
    trigger,
    viewModel,
  };
}

export function useBooks() {
  const {
    data: rawData,
    isLoading,
    error: swrError,
  } = useSWR(`http://localhost:8080/book`, fetcher);

  const error =
    rawData != null && rawData.statusCode !== 200
      ? {
          status: rawData.statusCode,
          message:
            "一時的にエラーが発生しております。再度時間置いて検索してください。",
        }
      : undefined;

  const viewModel = error != null ? undefined : convert(rawData?.data);
  return {
    error,
    data: viewModel,
    isLoading,
  };
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return { data: json, statusCode: response.status };
};
