import {
    object,
    string,
    boolean
}
    from 'zod';

const PostSchemaZod = object({ //* Schema for validation of Types data
    NickName: string(),
    FullName: string(),
    PhotoURL: string(),
    lastLogin: string(),
    Post:
        object({
            Content: string(),
            CreateAt: string(),
            IsDisable: boolean()
        })
});

export default PostSchemaZod;