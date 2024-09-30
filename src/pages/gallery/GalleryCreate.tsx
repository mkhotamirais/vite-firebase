// import {z} from "zod"
// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
// import {Input} from "@/components/ui/input"
// import {Button} from "@/components/ui/button"
// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"

// const GallerySchema = z.object({
//     image: z.instanceof(File, { message: "File is required" })
// })

// type GalleryType = z.infer<typeof GallerySchema>;

export default function GalleryCreate() {
  // const [preview, setPreview] = useState<string | undefined>(undefined);

  // const form = useForm<GalleryType>({
  //     resolver: zodResolver(GallerySchema),
  //     defaultValues: {
  //         image: undefined
  //     }
  // })

  return <div>GalleryCreate</div>;
}
