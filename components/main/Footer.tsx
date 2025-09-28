export const Footer = () => {
    return (<footer className="bg-indigo-700 max-w-[1440px] mx-auto mt-[24px] py-[40px] px-[80px] ">
        <div className="flex text-white justify-between max-w-[1080px] pb-[64px]">
            <div>
                <h1 className="font-bold text-[16px] ">Movie Z</h1>
                <p className="font-inter text-[14px]">© 2024 Movie Z. All Rights Reserved.</p>
            </div>
            <div className="text-[14px] font-inter flex justify-between">
                <div>
                    <p>Contact Information</p>
                    <p className="mt-[12px] font-bold">Email:</p>
                    <div>support@movieZ.com</div>
                    <p className="mt-[24px] font-bold">Phone:</p>
                    <div>+976 (11) 123-4567</div>
                </div>
                <div className="ml-[96px]">
                    <p className="mb-[12px]">Follow us</p>
                    <p>Facebook Instagram Twitter Youtube</p>
                </div>
            </div>
        </div>
    </footer>
    )
}