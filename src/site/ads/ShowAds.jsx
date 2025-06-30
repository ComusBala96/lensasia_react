import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ShowAds({ index, delay }) {
    const [data, setData] = useState(null);
    const [path, setPath] = useState('');
    const [additionalPath, setAdditionalPath] = useState('');
    const [prefer, setPrefer] = useState('');

    useEffect(() => {
        const el = document.getElementById('news_content');
        if (el) {
            const newsAds = JSON.parse(el.getAttribute('data-ads') || '{}');
            setPath(newsAds?.path || '');
            setAdditionalPath(newsAds?.additionalPath || '');
            setData(newsAds?.ads?.[index] || null);
            setPrefer(newsAds?.prefer);
        }
    }, [index]);

    if (!data || !data.image || prefer === 0) return null;

    const renderSlide = (imgData, isMain = false) => {
        const src = isMain
            ? path + data?.image + data?.size_md + data?.ext
            : additionalPath + imgData?.name + imgData?.size_md + imgData?.ext;

        const alt = isMain
            ? data?.image + data?.size_md + data?.ext
            : imgData?.name + imgData?.size_md + imgData?.ext;

        return (
            <SwiperSlide key={isMain ? 'main' : alt}>
                <div className="relative text-white h-[300px] w-[300px] mx-auto">
                    <div className="h-full w-full">
                        <img
                            data-style='{"fit":[0,0]}'
                            src={src}
                            alt={alt}
                            className="h-full w-full object-cover transition duration-300 ease-in-out hover:scale-[1.005]"
                        />
                    </div>
                    {data?.sponsored === 1 && (
                        <div data-style='{"opacity":0}' className="absolute right-0 top-0">
                            <p
                                className="text-nowrap bg-black/50 px-2 py-0.5 text-xs"
                            >
                                Sponsored
                            </p>
                        </div>
                    )}
                    {data?.link && (
                        <a
                            href={data?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-0"
                        ></a>
                    )}
                </div>
            </SwiperSlide>
        );
    };

    return (
        <div className="my-2 overflow-hidden">
            <Swiper
                direction='horizontal'
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: delay,
                    disableOnInteraction: false,
                }}
                mousewheel={{
                    enabled: false,
                }}
                modules={[Autoplay]}
                className="w-full">
                {renderSlide(null, true)}
                {data?.images?.map((image, i) => renderSlide(image))}
            </Swiper>
        </div>
    );
}
