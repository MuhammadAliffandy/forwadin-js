
const Message = () => {
    return (
        <div className="border border-black/20 px-4 py-[2px] rounded-xl flex justify-between text-[10px] items-center gap-2">
            <div className="flex-none w-[40px] ">
                <img src={'/assets/icons/dummy_user_image.png'} width={31} height={31} alt="" />
                {/* <Image src={'/assets/icons/dummy_user_image.png'} width={31} height={31} alt="" /> */}
            </div>
            <div className="">
                <p className="" style={{ WebkitLineClamp: 2, overflow: 'hidden', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex similique, maxime quibusdam excepturi porro eum est ullam sequi nam sunt. Officiis, deserunt minus? Neque repudiandae beatae eaque quasi quibusdam soluta repellat voluptate ipsa vel minus! Quia, culpa quam. Aliquid, ratione. Aut tempora voluptatibus possimus harum exercitationem corporis, mollitia ratione adipisci?</p>
            </div>
            <div>
                <div className="bg-primary text-white p-1">
                    Keluar
                </div>
            </div>
        </div>
    )
}

export default Message