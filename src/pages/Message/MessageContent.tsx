import { convertIsoDateTime, convertStringToHtml } from '~/utils/files';
import { WrapperContent } from '~/components/Content';
import * as messageService from '~/services/message.service'
import type { IUMesDeApi } from '~/common/types';
import { useQuery } from '@tanstack/react-query';

interface IMessageContent {
  uuid_reveicer: string;
}

export default function MessageContent({ uuid_reveicer }: IMessageContent) {
  const { data: dataDe, isLoading, error, refetch } = useQuery({
    queryKey: ['messageDe', uuid_reveicer],
    queryFn: async (): Promise<IUMesDeApi[]> => {
      const res = await messageService.oldMessage(uuid_reveicer);
      return res;
    },
  });

  return (
    <WrapperContent error={error} refetch={refetch} isLoading={isLoading}>
      {dataDe?.length === 0 ? (
        <div className="text-center">Không có dữ liệu</div>
      ) : (
        dataDe?.map((item, index) => {
          return (
            <div key={index} className="rounded bg-white p-4 shadow">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <img
                    src={
                      item.receiver_image == '' || !item.receiver_image
                        ? '/no-user.png'
                        : item.receiver_image
                    }
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {item.receiver_name == ''
                        ? 'Không xác định'
                        : item.receiver_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.title == '' ? 'Không xác định' : item.title}
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">
                    {convertIsoDateTime(item.created_at)}
                  </div>
                </div>
                <h3 className="my-1 text-sm font-semibold">{item.title}</h3>
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={convertStringToHtml(item.content)}
                ></p>
              </div>
            </div>
          );
        })
      )}
    </WrapperContent>
  );
}
